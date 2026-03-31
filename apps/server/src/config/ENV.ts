import dotenv from 'dotenv';

dotenv.config();

const ENV = {
    DATABASE_URL : process.env.DATABASE_URL,
    PORT : process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET!
}

export default ENV;