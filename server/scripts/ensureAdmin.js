import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../model/User.js';

dotenv.config();

const ADMIN_EMAIL = 'admin@shopnest.com';
const ADMIN_PASSWORD = 'Admin@123';

const ensureAdmin = async () => {
    await connectDB();

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await User.findOneAndUpdate(
        { email: ADMIN_EMAIL },
        {
            name: 'Admin User',
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin',
            verified: true,
            otp: undefined,
            otpExpiresAt: null,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    console.log('Admin ready:');
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  Role:     ${admin.role}`);
    console.log(`  Verified: ${admin.verified}`);

    process.exit(0);
};

ensureAdmin().catch((error) => {
    console.error('ensureAdmin failed:', error);
    process.exit(1);
});
