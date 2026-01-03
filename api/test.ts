export default async (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Vercel serverless function is working',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoDb: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
    }
  });
};
