import { collections } from '../data/db.js';

export const DEFAULT_PLANS = [
  // Worker Plans
  {
    id: 'plan_worker_free',
    tier: 'free',
    targetRole: 'jobseeker',
    name: 'Free Worker Starter',
    description: 'Essential access for tradesmen starting out on WorkBridge.',
    price: 0,
    currency: 'ETB',
    interval: 'free',
    durationDays: 30,
    applicationLimit: 5,
    features: [
      'Create public tradesman profile',
      'Search all open job postings',
      'Apply to up to 5 jobs per month',
      'Receive direct booking requests',
      'Direct chat with clients',
    ],
  },
  {
    id: 'plan_worker_pro_monthly',
    tier: 'pro_monthly',
    targetRole: 'jobseeker',
    name: 'Pro Worker Monthly',
    description: 'For active tradesmen seeking steady weekly client work.',
    price: 299,
    currency: 'ETB',
    interval: 'monthly',
    durationDays: 30,
    applicationLimit: -1, // Unlimited
    isPopular: true,
    features: [
      'Unlimited job applications',
      'Verified Pro Tradesman badge',
      'Priority search ranking in worker discovery',
      'Direct client messaging & booking',
      'Featured portfolio showcase',
      '24/7 dedicated support',
    ],
  },
  {
    id: 'plan_worker_pro_annual',
    tier: 'pro_annual',
    targetRole: 'jobseeker',
    name: 'Pro Worker Annual',
    description: 'Best value for dedicated trade professionals (Save 30%).',
    price: 2499,
    currency: 'ETB',
    interval: 'annual',
    durationDays: 365,
    applicationLimit: -1, // Unlimited
    features: [
      'Everything in Pro Monthly',
      'Unlimited job applications for 1 full year',
      'Highest priority search boost in Addis Ababa & regional cities',
      'Dedicated SMS booking alerts',
      '30% discount vs monthly billing',
    ],
  },

  // Employer Plans
  {
    id: 'plan_employer_free',
    tier: 'free',
    targetRole: 'employer',
    name: 'Free Client Starter',
    description: 'Perfect for individual homeowners needing occasional repairs.',
    price: 0,
    currency: 'ETB',
    interval: 'free',
    durationDays: 30,
    jobPostLimit: 3,
    features: [
      'Browse & search all verified workers',
      'Post up to 3 free job listings',
      'Direct booking requests',
      'Chat with applicants',
      'Standard customer support',
    ],
  },
  {
    id: 'plan_employer_pro_monthly',
    tier: 'pro_monthly',
    targetRole: 'employer',
    name: 'Pro Employer Monthly',
    description: 'For property managers, contractors, and busy households.',
    price: 599,
    currency: 'ETB',
    interval: 'monthly',
    durationDays: 30,
    jobPostLimit: -1, // Unlimited
    isPopular: true,
    features: [
      'Unlimited job postings',
      'Verified Employer badge',
      'Instant direct worker contact',
      'Featured job listing tags',
      'Applicant tracking & management pipeline',
      'Priority support',
    ],
  },
  {
    id: 'plan_employer_pro_annual',
    tier: 'pro_annual',
    targetRole: 'employer',
    name: 'Pro Employer Annual',
    description: 'For construction firms & enterprises hiring year-round.',
    price: 4999,
    currency: 'ETB',
    interval: 'annual',
    durationDays: 365,
    jobPostLimit: -1, // Unlimited
    features: [
      'Everything in Pro Monthly',
      'Unlimited job postings for 1 year',
      'Dedicated account manager',
      'Custom company branding & logo badges',
      'Save over 30% annually',
    ],
  },
];

export const getSubscriptionPlans = async (req, res) => {
  try {
    const { targetRole } = req.query;
    let plans = DEFAULT_PLANS;
    if (targetRole) {
      plans = plans.filter((p) => p.targetRole === targetRole);
    }
    return res.json({ plans });
  } catch (error) {
    console.error('getSubscriptionPlans error:', error);
    return res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
};

export const getCurrentSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await collections.users.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sub = await collections.subscriptions.findOne(
      { userId, status: 'active' },
      { sort: { createdAt: -1 } }
    );

    const isPro = sub && (sub.tier === 'pro_monthly' || sub.tier === 'pro_annual');
    const tier = isPro ? sub.tier : 'free';

    const applicationsUsed = user.applicationsUsedThisMonth || 0;
    const applicationsLimit = isPro ? -1 : 5;
    const applicationsRemaining = isPro ? -1 : Math.max(0, 5 - applicationsUsed);

    const jobPostsUsed = user.jobPostsUsed || 0;
    const jobPostsLimit = isPro ? -1 : 3;
    const jobPostsRemaining = isPro ? -1 : Math.max(0, 3 - jobPostsUsed);

    const quotas = {
      tier,
      isPro: Boolean(isPro),
      applicationsUsed,
      applicationsLimit,
      applicationsRemaining,
      jobPostsUsed,
      jobPostsLimit,
      jobPostsRemaining,
      subscriptionExpiresAt: sub?.endDate,
    };

    return res.json({
      subscription: sub || null,
      quotas,
    });
  } catch (error) {
    console.error('getCurrentSubscription error:', error);
    return res.status(500).json({ error: 'Failed to fetch current subscription' });
  }
};

export const getUserQuotas = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await collections.users.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sub = await collections.subscriptions.findOne(
      { userId, status: 'active' },
      { sort: { createdAt: -1 } }
    );

    const isPro = sub && (sub.tier === 'pro_monthly' || sub.tier === 'pro_annual');
    const tier = isPro ? sub.tier : 'free';

    const applicationsUsed = user.applicationsUsedThisMonth || 0;
    const applicationsLimit = isPro ? -1 : 5;
    const applicationsRemaining = isPro ? -1 : Math.max(0, 5 - applicationsUsed);

    const jobPostsUsed = user.jobPostsUsed || 0;
    const jobPostsLimit = isPro ? -1 : 3;
    const jobPostsRemaining = isPro ? -1 : Math.max(0, 3 - jobPostsUsed);

    return res.json({
      tier,
      isPro: Boolean(isPro),
      applicationsUsed,
      applicationsLimit,
      applicationsRemaining,
      jobPostsUsed,
      jobPostsLimit,
      jobPostsRemaining,
      subscriptionExpiresAt: sub?.endDate,
    });
  } catch (error) {
    console.error('getUserQuotas error:', error);
    return res.status(500).json({ error: 'Failed to fetch quotas' });
  }
};

export const mockCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId, paymentMethod = 'telebirr', phoneNumber, accountNumber } = req.body;

    const plan = DEFAULT_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const user = await collections.users.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationDays);

    const subscriptionId = `sub_${Date.now()}`;
    const paymentId = `pay_mock_${Date.now()}`;
    const ref = `WB-${paymentMethod.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newSubscription = {
      id: subscriptionId,
      userId,
      tier: plan.tier,
      planId: plan.id,
      targetRole: plan.targetRole,
      status: 'active',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      paymentId,
      autoRenew: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newPayment = {
      id: paymentId,
      userId,
      subscriptionId,
      amount: plan.price,
      currency: 'ETB',
      status: 'completed',
      paymentMethod: `Mock ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`,
      transactionReference: ref,
      description: `Subscription to ${plan.name} (${plan.durationDays} days)`,
      metadata: { phoneNumber, accountNumber, planId },
      createdAt: new Date().toISOString(),
    };

    // Deactivate previous active subscriptions for this user
    await collections.subscriptions.updateMany(
      { userId, status: 'active' },
      { $set: { status: 'cancelled', updatedAt: new Date().toISOString() } }
    );

    // Save new subscription & payment transaction
    await collections.subscriptions.insertOne(newSubscription);
    await collections.payments.insertOne(newPayment);

    // Update user record with active tier & reset quotas
    await collections.users.updateOne(
      { id: userId },
      {
        $set: {
          subscriptionTier: plan.tier,
          subscriptionExpiresAt: endDate.toISOString(),
          isPro: plan.tier !== 'free',
          updatedAt: new Date().toISOString(),
        },
      }
    );

    console.log(`[Subscription] User ${userId} upgraded to ${plan.name} via ${paymentMethod} (Ref: ${ref})`);

    return res.status(200).json({
      success: true,
      message: `Payment successful! Your ${plan.name} is now active.`,
      subscription: newSubscription,
      transaction: newPayment,
    });
  } catch (error) {
    console.error('mockCheckout error:', error);
    return res.status(500).json({ error: 'Failed to process mock payment' });
  }
};

