// import local modules
import { User } from '../../models/index.js';
import { USER_ROLES } from '../constants.js';

// import external modules
import mongoose from 'mongoose';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function getSystemAdminUserEmailFromCLI() {
  // create readline interface to read email and close it
  const rl = readline.createInterface({ input, output });
  const email = await rl.question('--- Enter System Admin User Email: ');
  rl.close();

  // check for empty email
  if (!email.trim()) throw new Error('Email is required');

  // return email
  return email.trim().toLowerCase();
}

(async function () {
  try {
    // connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('--- Database Connection: ✅');

    // find existing system_admin user
    const existingSystemAdminUser = await User.findOne({ role: USER_ROLES.SYSTEM_ADMIN });

    // if system_admin user exists, throw error as only one system admin user is allowed
    if (existingSystemAdminUser) throw new Error('A System_Admin User already exists');

    // get systemAdminUserEmail from CLI
    const email = await getSystemAdminUserEmailFromCLI();

    // create systemAdminUser with provided email
    const systemAdminUser = await User.create({
      email,
      role: USER_ROLES.SYSTEM_ADMIN,
      username: `system_admin`,
    });
    if (!systemAdminUser) throw new Error('Something went wrong while creating System_Admin User');
    console.log('--- System_Admin User Created Successfully: ✅');

    // disconnect from database
    await mongoose.disconnect();
    console.log('--- Database Disconnected: ✅');

    // exit with success
    process.exit(0);
  } catch (error) {
    // log error
    console.error('---------------------------------------------------------');
    console.error('ERROR DURING SYSTEM ADMIN INITIALIZATION');
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
