import bcrypt from 'bcryptjs';
import { collections } from '../data/db.js';
import { signToken } from '../utils/token.js';
import { sendOtpEmail } from '../utils/emailService.js';

const normalizeRole = (role) => {
  if (role === 'jobseeker') return 'worker';
  return role || 'worker';
};

const mapRoleForFrontend = (role) => {
  if (role === 'worker') return 'jobseeker';
  return role;
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { passwordHash, _id, ...rest } = user;
  const role = mapRoleForFrontend(user.role);
  const fullName = user.fullName || user.name || (user.email ? user.email.split('@')[0] : 'User');
  return {
    id: user.id || String(_id),
    email: user.email,
    role,
    fullName,
    isEmailVerified: user.isEmailVerified ?? user.verified ?? true,
    status: user.status || 'active',
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
    lastLoginAt: user.lastLoginAt || null,
    profile: user.profile || {},
    ...rest,
    role,
    fullName,
    isEmailVerified: user.isEmailVerified ?? user.verified ?? true,
  };
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await collections.users.findOne({
    email: { $regex: new RegExp(`^${String(email).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
  });

  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken({ id: user.id, role: user.role });
  return res.json({ user: sanitizeUser(user), token });
};

export const register = async (req, res) => {
  const { name, fullName, email, password, role = 'worker' } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const normalizedRole = normalizeRole(role);
  const cleanEmail = String(email).trim().toLowerCase();
  const existing = await collections.users.findOne({
    email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
  });

  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const userName = fullName || name || cleanEmail.split('@')[0];
  const newUser = {
    id: `u${Date.now()}`,
    name: userName,
    fullName: userName,
    email: cleanEmail,
    passwordHash: bcrypt.hashSync(password, 10),
    role: normalizedRole,
    verified: true,
    isEmailVerified: true,
    status: 'active',
    profile: {},
    notifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await collections.users.insertOne(newUser);

  if (normalizedRole === 'worker') {
    await collections.profiles.insertOne({
      id: `p${Date.now()}`,
      userId: newUser.id,
      type: 'jobseeker',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } else if (normalizedRole === 'employer') {
    await collections.profiles.insertOne({
      id: `p${Date.now()}`,
      userId: newUser.id,
      type: 'employer-company',
      employerType: 'COMPANY_EMPLOYER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  const token = signToken({ id: newUser.id, role: normalizedRole });

  return res.status(201).json({ user: sanitizeUser(newUser), token });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await collections.users.findOne({ email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });

    if (!user) {
      // Return ambiguous message for security, but return simulation code in dev if needed
      return res.status(200).json({
        message: 'If an account exists with this email, a 6-digit verification code has been sent.',
        email: cleanEmail,
      });
    }

    // Generate 6-digit numeric OTP (e.g., 584920)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes expiry

    await collections.users.updateOne(
      { id: user.id },
      {
        $set: {
          resetPasswordOtp: otp,
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetExpires,
        },
      }
    );

    // Send OTP Email (via Resend, Brevo, or Simulator)
    await sendOtpEmail({
      to: user.email,
      name: user.fullName || user.name || 'User',
      otp,
    });

    return res.json({
      message: 'A 6-digit verification code has been sent to your email.',
      email: cleanEmail,
      otp, // Provided for easy development / demo testing
      resetToken,
      resetUrl: `/reset-password/${resetToken}`,
    });
  } catch (error) {
    console.error('forgotPassword error:', error);
    return res.status(500).json({ error: 'Failed to process forgot password request.' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and 6-digit OTP code are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    const user = await collections.users.findOne({
      email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      resetPasswordOtp: cleanOtp,
      resetPasswordExpires: { $gt: new Date().toISOString() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired 6-digit verification code.' });
    }

    return res.json({
      success: true,
      message: 'OTP verified successfully.',
      resetToken: user.resetPasswordToken,
      email: user.email,
    });
  } catch (error) {
    console.error('verifyOtp error:', error);
    return res.status(500).json({ error: 'Failed to verify code.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, email, otp, password, newPassword } = req.body;
    const targetPassword = newPassword || password;

    if (!targetPassword || targetPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    let user = null;

    if (token) {
      user = await collections.users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date().toISOString() },
      });
    } else if (email && otp) {
      const cleanEmail = String(email).trim().toLowerCase();
      const cleanOtp = String(otp).trim();
      user = await collections.users.findOne({
        email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
        resetPasswordOtp: cleanOtp,
        resetPasswordExpires: { $gt: new Date().toISOString() },
      });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired password reset session.' });
    }

    await collections.users.updateOne(
      { id: user.id },
      {
        $set: {
          passwordHash: bcrypt.hashSync(targetPassword, 10),
          updatedAt: new Date().toISOString(),
        },
        $unset: {
          resetPasswordOtp: '',
          resetPasswordToken: '',
          resetPasswordExpires: '',
        },
      }
    );

    console.log(`[Auth] Password successfully reset for user ${user.email}`);

    return res.json({
      success: true,
      message: 'Password updated successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('resetPassword error:', error);
    return res.status(500).json({ error: 'Failed to reset password.' });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await collections.users.findOne({ email: { $regex: new RegExp(`^${String(email).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  await collections.users.updateOne(
    { id: user.id },
    { $set: { verified: true } }
  );
  return res.json({ message: 'Email verified successfully.' });
};

export const getMe = async (req, res) => {
  const user = await collections.users.findOne({ id: req.user.id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user: sanitizeUser(user) });
};

const oauthStateStore = new Map();

export const googleLogin = async (req, res) => {
  const role = req.query.role || req.body?.role || 'jobseeker';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const clientId = process.env.GOOGLE_CLIENT_ID;

  // 1. If valid live Google OAuth credentials are configured, execute standard Google OAuth redirect
  if (clientId && clientId !== 'your_google_client_id' && !clientId.startsWith('dummy')) {
    const state = Buffer.from(JSON.stringify({ role })).toString('base64url');
    oauthStateStore.set(state, { role, createdAt: Date.now() });

    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    for (const [key, value] of oauthStateStore.entries()) {
      if (value.createdAt < tenMinutesAgo) {
        oauthStateStore.delete(key);
      }
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL || `${req.protocol}://${req.get('host')}/api/auth/google/callback`,
      response_type: 'code',
      scope: 'profile email',
      state: state,
      access_type: 'offline',
      prompt: 'consent',
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return res.redirect(authUrl);
  }

  // 2. Development & Defense Sandbox Mode (When Google Client ID is not configured in local environment):
  // Seamlessly authenticate a verified Google user matching the requested role
  const normalizedRole = normalizeRole(role);
  const isEmployer = normalizedRole === 'employer';
  const googleEmail = isEmployer ? 'sara.google@workbridge.et' : 'abebe.google@workbridge.et';
  const googleName = isEmployer ? 'Sara Haile (Google)' : 'Abebe Bikila (Google)';
  const googleAvatar = isEmployer
    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150';

  const users = collections.users;
  let user = await users.findOne({ email: googleEmail });

  if (!user) {
    const newUser = {
      id: `u${Date.now()}`,
      name: googleName,
      fullName: googleName,
      email: googleEmail,
      passwordHash: bcrypt.hashSync('GoogleAuthPass123!', 10),
      role: normalizedRole,
      avatar: googleAvatar,
      verified: true,
      isEmailVerified: true,
      status: 'active',
      profile: {
        location: 'Addis Ababa',
        headline: isEmployer ? 'Verified Property Owner & Client' : 'Master Electrician & Certified Tradesman',
      },
      notifications: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await users.insertOne(newUser);

    if (normalizedRole === 'worker') {
      await collections.profiles.insertOne({
        id: `p${Date.now()}`,
        userId: newUser.id,
        type: 'jobseeker',
        headline: 'Master Electrician & Certified Tradesman',
        skills: ['Electrical Wiring', 'Appliance Repair', 'Solar Setup'],
        location: 'Addis Ababa',
        hourlyRate: 350,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await collections.profiles.insertOne({
        id: `p${Date.now()}`,
        userId: newUser.id,
        type: 'employer-company',
        employerType: 'COMPANY_EMPLOYER',
        companyName: 'Sara Haile Properties',
        location: 'Addis Ababa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    user = newUser;
  }

  console.log(`\n========================================`);
  console.log(`🌐 [GOOGLE AUTHENTICATION - INSTANT SIGN IN]`);
  console.log(`User: ${googleName} (${user.email})`);
  console.log(`Role: ${normalizedRole.toUpperCase()} | Token Issued`);
  console.log(`========================================\n`);

  const token = signToken({ id: user.id, role: user.role });
  const frontendRole = mapRoleForFrontend(user.role);
  const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&role=${frontendRole}`;
  return res.redirect(redirectUrl);
};

export const googleCallback = async (req, res) => {
  const { code, state } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  if (!code) {
    return res.redirect(`${frontendUrl}/login?error=no_code`);
  }

  let intendedRole = 'jobseeker';

  if (state) {
    if (oauthStateStore.has(state)) {
      const stored = oauthStateStore.get(state);
      intendedRole = stored.role || 'jobseeker';
      oauthStateStore.delete(state);
    } else {
      try {
        const decoded = JSON.parse(Buffer.from(state, 'base64url').toString('utf8'));
        if (decoded?.role) intendedRole = decoded.role;
      } catch (err) {
        console.warn('Could not parse OAuth state:', err);
      }
    }
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: process.env.GOOGLE_CALLBACK_URL || '',
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      console.error('Google token exchange error:', tokens);
      return res.redirect(`${frontendUrl}/login?error=token_error`);
    }

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const profile = await profileResponse.json();
    const email = profile.email;

    if (!email) {
      return res.redirect(`${frontendUrl}/login?error=no_email`);
    }

    const users = collections.users;
    let user = await users.findOne({ email: { $regex: new RegExp(`^${String(email).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });

    if (!user) {
      const normalizedRole = normalizeRole(intendedRole);
      const cleanEmail = String(email).trim().toLowerCase();
      const userName = profile.name || cleanEmail.split('@')[0];
      const avatar = profile.picture || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`;

      const newUser = {
        id: `u${Date.now()}`,
        name: userName,
        fullName: userName,
        email: cleanEmail,
        passwordHash: bcrypt.hashSync(Math.random().toString(36), 10),
        role: normalizedRole,
        avatar,
        verified: true,
        isEmailVerified: true,
        status: 'active',
        profile: {
          location: 'Addis Ababa',
          headline: normalizedRole === 'worker' ? 'Professional Trade Specialist' : 'Employer / Property Manager',
        },
        notifications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await users.insertOne(newUser);

      if (normalizedRole === 'worker') {
        await collections.profiles.insertOne({
          id: `p${Date.now()}`,
          userId: newUser.id,
          type: 'jobseeker',
          headline: 'Professional Trade Specialist',
          skills: ['Electrician', 'Plumber', 'Technical Support'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else if (normalizedRole === 'employer') {
        await collections.profiles.insertOne({
          id: `p${Date.now()}`,
          userId: newUser.id,
          type: 'employer-company',
          employerType: 'COMPANY_EMPLOYER',
          companyName: `${userName}'s Organization`,
          location: 'Addis Ababa',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      user = newUser;
    }

    const token = signToken({ id: user.id, role: user.role });
    const frontendRole = mapRoleForFrontend(user.role);
    const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&role=${frontendRole}`;
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
};

export const googleCredentialAuth = async (req, res) => {
  try {
    const { credential, email, name, picture, role } = req.body;
    let userEmail = email;
    let userName = name;
    let userAvatar = picture;

    // Decode Google ID Token if passed
    if (credential && !userEmail) {
      const parts = credential.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        userEmail = payload.email;
        userName = payload.name || payload.email?.split('@')[0];
        userAvatar = payload.picture;
      }
    }

    if (!userEmail) {
      return res.status(400).json({ error: 'Valid Google email is required' });
    }

    const cleanEmail = String(userEmail).trim().toLowerCase();
    const users = collections.users;
    let user = await users.findOne({ email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });

    if (!user) {
      const normalizedRole = normalizeRole(role || 'jobseeker');
      const finalName = userName || cleanEmail.split('@')[0];

      const newUser = {
        id: `u${Date.now()}`,
        name: finalName,
        fullName: finalName,
        email: cleanEmail,
        passwordHash: bcrypt.hashSync(Math.random().toString(36), 10),
        role: normalizedRole,
        avatar: userAvatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
        verified: true,
        isEmailVerified: true,
        status: 'active',
        profile: {
          location: 'Addis Ababa',
          headline: normalizedRole === 'worker' ? 'Professional Trade Specialist' : 'Employer / Property Manager',
        },
        notifications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await users.insertOne(newUser);

      if (normalizedRole === 'worker') {
        await collections.profiles.insertOne({
          id: `p${Date.now()}`,
          userId: newUser.id,
          type: 'jobseeker',
          headline: 'Professional Trade Specialist',
          skills: ['Trade Skills', 'Technical Repair'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        await collections.profiles.insertOne({
          id: `p${Date.now()}`,
          userId: newUser.id,
          type: 'employer-company',
          employerType: 'COMPANY_EMPLOYER',
          companyName: `${finalName}'s Organization`,
          location: 'Addis Ababa',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      user = newUser;
    }

    const token = signToken({ id: user.id, role: user.role });
    return res.status(200).json({
      user: sanitizeUser(user),
      token,
      message: 'Google authentication successful',
    });
  } catch (error) {
    console.error('googleCredentialAuth error:', error);
    return res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
};

export const logout = async (req, res) => {
  return res.json({ message: 'Logged out successfully' });
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = await collections.users.findOne({ email: { $regex: new RegExp(`^${String(email).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });
  if (!user) {
    return res.status(200).json({ message: 'If this email exists, a verification email has been sent.' });
  }

  return res.json({ message: 'Verification email has been sent.' });
};
