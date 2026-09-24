import 'dotenv/config';
import app from './app.js';
import { initDB } from './data/db.js';

const start = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    await initDB();
    const PORT = process.env.PORT || 4000;
    const HOST = process.env.HOST || '0.0.0.0';
    const server = app.listen(PORT, HOST, () => {
      console.log(`WorkBridge API running at http://${HOST}:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`[Port Warning] Port ${PORT} is in use. Retrying on port ${Number(PORT) + 1}...`);
        app.listen(Number(PORT) + 1, HOST, () => {
          console.log(`WorkBridge API running at http://${HOST}:${Number(PORT) + 1}`);
        });
      } else {
        console.error('Failed to start server:', err);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
