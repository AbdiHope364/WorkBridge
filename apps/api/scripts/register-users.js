import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { initDB, collections } from '../src/data/db.js';

async function registerAccounts() {
  console.log('Connecting to MongoDB Atlas...');
  await initDB();
  console.log('Connected to MongoDB successfully!\n');

  const passwordHash = bcrypt.hashSync('Password123!', 10);

  const accountsToRegister = [
    {
      id: 'u_client_primary',
      name: 'Blen Mulugeta',
      fullName: 'Blen Mulugeta',
      email: 'client@example.com',
      passwordHash,
      role: 'employer',
      verified: true,
      isEmailVerified: true,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      phone: '+251 911 234 567',
      profile: {
        companyName: 'Blen Property Management & Residences',
        industry: 'Residential & Commercial Facilities',
        companySize: '1-10 employees',
        description: 'Managing residential homes and commercial rental units in Addis Ababa. Frequently hiring electricians, plumbers, and maintenance specialists.',
        location: 'Addis Ababa, Bole & CMC',
        verifiedCompany: true,
      },
      profileDoc: {
        id: 'p_client_primary',
        type: 'employer-company',
        employerType: 'COMPANY_EMPLOYER',
        companyName: 'Blen Property Management & Residences',
        industry: 'Residential & Commercial Facilities',
        location: 'Addis Ababa, Bole & CMC',
      },
    },
    {
      id: 'u2',
      name: 'Acme Corporation',
      fullName: 'Michael Vance (Acme Corp)',
      email: 'employer@example.com',
      passwordHash,
      role: 'employer',
      verified: true,
      isEmailVerified: true,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150',
      phone: '+251 922 345 678',
      profile: {
        companyName: 'Acme Corporation',
        industry: 'Facilities & Technology',
        companySize: '50-200 employees',
        website: 'https://acmecorp.com',
        description: 'Corporate facilities, office developments, and technical infrastructure across Addis Ababa.',
        location: 'Addis Ababa & Global Remote',
        verifiedCompany: true,
      },
      profileDoc: {
        id: 'p2',
        type: 'employer-company',
        employerType: 'COMPANY_EMPLOYER',
        companyName: 'Acme Corporation',
        industry: 'Facilities & Technology',
        location: 'Addis Ababa & Global Remote',
      },
    },
    {
      id: 'u1',
      name: 'Alex Johnson',
      fullName: 'Alex Johnson',
      email: 'worker@example.com',
      passwordHash,
      role: 'worker',
      verified: true,
      isEmailVerified: true,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      phone: '+251 933 456 789',
      profile: {
        headline: 'Senior Full-Stack TypeScript & React Developer',
        trade: 'Software Engineer',
        summary: 'Experienced full-stack developer with 6+ years specializing in Next.js, Node.js, and cloud native architectures.',
        location: 'Addis Ababa / Remote',
        hourlyRate: 45,
        currency: 'USD',
        skills: ['React', 'Next.js', 'Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL', 'TailwindCSS'],
        experienceYears: 6,
        availability: 'Available',
      },
      profileDoc: {
        id: 'p1',
        type: 'jobseeker',
        headline: 'Senior Full-Stack TypeScript & React Developer',
        skills: ['React', 'Next.js', 'Node.js', 'Express', 'TypeScript', 'MongoDB'],
      },
    },
    {
      id: 'u_trade_electrician',
      name: 'Abebe Tadesse',
      fullName: 'Abebe Tadesse',
      email: 'electrician@example.com',
      passwordHash,
      role: 'worker',
      verified: true,
      isEmailVerified: true,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      phone: '+251 912 345 678',
      profile: {
        headline: 'Certified Master Electrician & Solar PV Technician',
        trade: 'Electrician',
        summary: 'Over 8 years experience in residential and commercial electrical installation, 3-phase power distribution, emergency fault troubleshooting, and solar inverter setup.',
        location: 'Addis Ababa (Bole, Kazanchis, Piassa)',
        hourlyRate: 350,
        currency: 'ETB',
        skills: ['Electrical Wiring', 'Circuit Breakers', '3-Phase Power', 'Solar Inverters', 'Short-Circuit Repair', 'Generator Connection'],
        experienceYears: 8,
        availability: 'Available for Immediate Booking',
        licenseNumber: 'EEA-LIC-2024-4019',
        isEmergencyAvailable: true,
      },
      profileDoc: {
        id: 'p_trade_electrician',
        type: 'jobseeker',
        headline: 'Certified Master Electrician & Solar PV Technician',
        trade: 'Electrician',
        skills: ['Electrical Wiring', 'Circuit Breakers', '3-Phase Power', 'Solar Inverters'],
      },
    },
    {
      id: 'u_trade_plumber',
      name: 'Kebede Kassaye',
      fullName: 'Kebede Kassaye',
      email: 'plumber@example.com',
      passwordHash,
      role: 'worker',
      verified: true,
      isEmailVerified: true,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      phone: '+251 933 567 890',
      profile: {
        headline: 'Master Sanitary Plumber & Pipe Fitting Specialist',
        trade: 'Plumber',
        summary: 'Specializing in residential and industrial plumbing, high-pressure leak detection, water pump installation, drainage unclogging, and bathroom sanitary fixtures.',
        location: 'Addis Ababa (CMC, Ayat, Sarbet)',
        hourlyRate: 300,
        currency: 'ETB',
        skills: ['Pipe Fitting', 'Leak Detection', 'Water Pump Repair', 'Drain Cleaning', 'Sanitary Installation', 'PEX & PPR Welding'],
        experienceYears: 10,
        availability: 'Available',
        isEmergencyAvailable: true,
      },
      profileDoc: {
        id: 'p_trade_plumber',
        type: 'jobseeker',
        headline: 'Master Sanitary Plumber & Pipe Fitting Specialist',
        trade: 'Plumber',
        skills: ['Pipe Fitting', 'Leak Detection', 'Water Pump Repair'],
      },
    },
  ];

  console.log('Registering and upserting user accounts in MongoDB Atlas:\n');

  for (const acc of accountsToRegister) {
    const { profileDoc, ...userData } = acc;

    // Upsert into users collection
    await collections.users.updateOne(
      { email: userData.email.toLowerCase() },
      {
        $set: {
          ...userData,
          email: userData.email.toLowerCase(),
          updatedAt: new Date().toISOString(),
        },
        $setOnInsert: {
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    // Upsert into profiles collection
    if (profileDoc) {
      await collections.profiles.updateOne(
        { userId: userData.id },
        {
          $set: {
            ...profileDoc,
            userId: userData.id,
            updatedAt: new Date().toISOString(),
          },
          $setOnInsert: {
            createdAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    }

    console.log(`✓ [${userData.role.toUpperCase()}] Registered: ${userData.email} | Name: ${userData.fullName} | ID: ${userData.id}`);
  }

  const totalUsers = await collections.users.countDocuments();
  const totalProfiles = await collections.profiles.countDocuments();

  console.log(`\n========================================`);
  console.log(`Database Verification Summary:`);
  console.log(`- Total Users in MongoDB Atlas: ${totalUsers}`);
  console.log(`- Total Profiles in MongoDB Atlas: ${totalProfiles}`);
  console.log(`========================================\n`);

  process.exit(0);
}

registerAccounts().catch((err) => {
  console.error('Registration script error:', err);
  process.exit(1);
});

