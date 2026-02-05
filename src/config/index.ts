import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/hr-management',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

export default config;
