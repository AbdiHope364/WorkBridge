import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'workbridge_secret';

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};

export const authenticateToken = protect;

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
