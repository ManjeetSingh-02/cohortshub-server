// import local modules
import { User } from '../models/index.js';
import { USER_ROLES } from '../utils/constants.js';

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

    // get systemAdminUserEmail from CLI
    const email = await getSystemAdminUserEmailFromCLI();

    // check if any system_admin user already exists
    const existingSystemAdminUsers = await User.find({ role: USER_ROLES.SYSTEM_ADMIN });

    // if system_admin user exists with same email, throw error
    if (existingSystemAdminUsers.find(user => user.email === email))
      throw new Error('System_Admin User with this email already exists');

    // create systemAdminUser with provided email
    const systemAdminUser = await User.create({
      email,
      fullName: `System Admin ${existingSystemAdminUsers.length + 1}`,
      role: USER_ROLES.SYSTEM_ADMIN,
      username: `system_admin_${existingSystemAdminUsers.length + 1}`,
    });
    if (!systemAdminUser) throw new Error('Something went wrong while creating System_Admin User');
    console.log('--- System_Admin User Created Successfully: ✅');

    // disconnect from database
    await mongoose.disconnect();
    console.log('--- Database Disconnected: ✅');
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
