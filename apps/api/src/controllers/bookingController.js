import { collections } from '../data/db.js';
import { mockUsers } from '../data/mocks/index.js';

export const createBooking = async (req, res) => {
  try {
    const {
      workerId,
      workerName,
      serviceTitle,
      category,
      description,
      address,
      locationNeighborhood,
      scheduledDate,
      urgency = 'Scheduled',
      offeredPrice,
      currency = 'ETB',
      clientPhone,
      notes,
    } = req.body;

    if (!workerId || !serviceTitle || !description || !address || !scheduledDate || !offeredPrice) {
      return res.status(400).json({ error: 'Missing required booking fields (workerId, serviceTitle, description, address, scheduledDate, offeredPrice).' });
    }

    const clientId = req.user?.id || 'client_user';
    const clientUser = await collections.users.findOne({ $or: [{ id: String(clientId) }, { _id: String(clientId) }] });
    
    let workerUser = await collections.users.findOne({
      $or: [{ id: String(workerId) }, { _id: String(workerId) }]
    });

    if (!workerUser) {
      const foundMock = (mockUsers || []).find((u) => u.id === workerId || u._id === workerId);
      workerUser = foundMock || {
        id: workerId,
        name: workerName || 'Trade Worker',
        fullName: workerName || 'Trade Worker',
        email: 'worker@workbridge.et',
        phone: '+251 91 123 4567',
        profile: { trade: category || 'Physical Trade' },
      };
    }

    const booking = {
      id: `b_${Date.now()}`,
      clientId,
      clientName: clientUser?.fullName || clientUser?.name || 'Client',
      clientEmail: clientUser?.email || '',
      clientPhone: clientPhone || clientUser?.phone || '',
      clientAvatar: clientUser?.avatar || '',
      workerId,
      workerName: workerUser?.fullName || workerUser?.name || 'Trade Worker',
      workerAvatar: workerUser?.avatar || '',
      workerTrade: workerUser?.profile?.trade || workerUser?.profile?.headline || category || 'Physical Trade',
      workerPhone: workerUser?.phone || '',
      serviceTitle,
      category: category || workerUser?.profile?.trade || 'Physical Trade',
      description,
      address,
      locationNeighborhood: locationNeighborhood || '',
      scheduledDate,
      urgency,
      offeredPrice: Number(offeredPrice),
      currency,
      status: 'PENDING',
      notes: notes || 'Awaiting worker acceptance',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await collections.bookings.insertOne(booking);

    // Send instant notification to worker
    const workerNotification = {
      id: `n_${Date.now()}`,
      userId: workerId,
      title: 'New Service Booking Request',
      message: `${booking.clientName} sent you a booking request for "${serviceTitle}" scheduled on ${new Date(scheduledDate).toLocaleDateString()} at ${address}.`,
      type: 'booking_request',
      category: 'booking',
      bookingId: booking.id,
      isRead: false,
      isSeen: false,
      link: '/dashboard/jobseeker',
      createdAt: new Date().toISOString(),
    };

    await collections.notifications.insertOne(workerNotification);

    return res.status(201).json({
      message: 'Booking request sent successfully to worker.',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({ error: 'Failed to create service booking request.' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { role, status } = req.query;

    const filter = {};

    if (role === 'worker') {
      filter.workerId = userId;
    } else if (role === 'client') {
      filter.clientId = userId;
    } else {
      filter.$or = [{ workerId: userId }, { clientId: userId }];
    }

    if (status && status !== 'ALL') {
      filter.status = status.toUpperCase();
    }

    const bookings = await collections.bookings
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return res.json({ bookings, total: bookings.length });
  } catch (error) {
    console.error('Get bookings error:', error);
    return res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await collections.bookings.findOne({ id });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    return res.json({ booking });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    return res.status(500).json({ error: 'Failed to retrieve booking.' });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const userId = req.user.id;

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const validStatuses = ['PENDING', 'ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    const normalizedStatus = status.toUpperCase();

    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const booking = await collections.bookings.findOne({ id });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Permission check
    const isWorker = booking.workerId === userId;
    const isClient = booking.clientId === userId;
    const isAdmin = req.user.role === 'admin';

    if (!isWorker && !isClient && !isAdmin) {
      return res.status(403).json({ error: 'You are not authorized to update this booking.' });
    }

    const updateFields = {
      status: normalizedStatus,
      updatedAt: new Date().toISOString(),
    };

    if (notes) {
      updateFields.notes = notes;
    }

    if (normalizedStatus === 'COMPLETED') {
      updateFields.paymentStatus = 'PAID';
    }

    await collections.bookings.updateOne({ id }, { $set: updateFields });

    const updatedBooking = { ...booking, ...updateFields };

    // Send notifications on status transitions
    let clientNotification = null;
    let workerNotification = null;

    if (normalizedStatus === 'ACCEPTED' && isWorker) {
      clientNotification = {
        id: `n_${Date.now()}`,
        userId: booking.clientId,
        title: 'Booking Confirmed & Accepted',
        message: `${booking.workerName} accepted your booking request for "${booking.serviceTitle}". Work is scheduled for ${new Date(booking.scheduledDate).toLocaleDateString()}.`,
        type: 'booking_accepted',
        category: 'booking',
        bookingId: booking.id,
        isRead: false,
        isSeen: false,
        link: '/dashboard/employer',
        createdAt: new Date().toISOString(),
      };
    } else if (normalizedStatus === 'DECLINED' && isWorker) {
      clientNotification = {
        id: `n_${Date.now()}`,
        userId: booking.clientId,
        title: 'Booking Request Declined',
        message: `${booking.workerName} was unavailable and declined the booking for "${booking.serviceTitle}".`,
        type: 'booking_declined',
        category: 'booking',
        bookingId: booking.id,
        isRead: false,
        isSeen: false,
        link: '/dashboard/employer',
        createdAt: new Date().toISOString(),
      };
    } else if (normalizedStatus === 'COMPLETED' && isWorker) {
      clientNotification = {
        id: `n_${Date.now()}`,
        userId: booking.clientId,
        title: 'Service Marked Completed',
        message: `${booking.workerName} completed the service "${booking.serviceTitle}". Please review the work and release payment.`,
        type: 'booking_completed',
        category: 'booking',
        bookingId: booking.id,
        isRead: false,
        isSeen: false,
        link: '/dashboard/employer',
        createdAt: new Date().toISOString(),
      };
    } else if (normalizedStatus === 'CANCELLED' && isClient) {
      workerNotification = {
        id: `n_${Date.now()}`,
        userId: booking.workerId,
        title: 'Booking Cancelled by Client',
        message: `${booking.clientName} cancelled the booking for "${booking.serviceTitle}".`,
        type: 'booking_cancelled',
        category: 'booking',
        bookingId: booking.id,
        isRead: false,
        isSeen: false,
        link: '/dashboard/jobseeker',
        createdAt: new Date().toISOString(),
      };
    }

    if (clientNotification) {
      await collections.notifications.insertOne(clientNotification);
    }
    if (workerNotification) {
      await collections.notifications.insertOne(workerNotification);
    }

    return res.json({
      message: `Booking successfully marked as ${normalizedStatus}.`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    return res.status(500).json({ error: 'Failed to update booking status.' });
  }
};

