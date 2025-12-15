// import local modules
import { User } from '../models/index.js';
import { USER_ROLES } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

(async function () {
  try {
    // connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('--- Database Connection: ✅');

    // check if any system_admin user exists (can be 1 or more)
    const existingSystemAdminUsers = await User.find({ role: USER_ROLES.SYSTEM_ADMIN });
    if (existingSystemAdminUsers.length < 1) throw new Error('No System_Admin User Found');
    console.log('--- System_Admin User Exists: ✅');

    // disconnect from database
    await mongoose.disconnect();
    console.log('--- Database Disconnected: ✅');
  } catch (error) {
    // log error
    console.error('---------------------------------------------------------');
    console.error('ERROR DURING SYSTEM ADMIN CHECK');
    console.error(`ERROR DETAILS: ${error.message}`);
    console.error('RUN SYSTEM ADMIN INITIALIZATION SCRIPT AGAIN');
    console.error('---------------------------------------------------------');

    // disconnect from database
    await mongoose.disconnect();
    console.log('--- Database Disconnected: ✅');

    // exit with failure
    process.exit(1);
  }
})();
