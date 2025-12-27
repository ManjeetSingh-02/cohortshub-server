// import local modules
import { User } from '../../models/index.js';
import { USER_ROLES } from '../constants.js';

// import external modules
import mongoose from 'mongoose';

(async function () {
  try {
    // connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('--- Database Connection: ✅');

    // find existing system_admin user
    const existingSystemAdminUser = await User.findOne({ role: USER_ROLES.SYSTEM_ADMIN });
    if (!existingSystemAdminUser) throw new Error('No System_Admin User Found');
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
