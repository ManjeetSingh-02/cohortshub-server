// import local modules
import { envConfig } from './env.js';

// import external modules
import mongoose from 'mongoose';

// function to connect to the database
export async function connectToDB() {
  await mongoose
    .connect(envConfig.MONGODB_URI)
    .then(() => console.log('Connection to DataBase: ✅'))
    .catch(error => {
      throw new Error(`Connection to DataBase: ❌\n${error.message}`);
    });
}

// function to run code in transaction session
export async function runInTransaction(callbackFn) {
  // create a new session and start a transaction
  const mongooseSession = await mongoose.startSession();
  mongooseSession.startTransaction();

  try {
    // try to execute the callback function with the session
    const callbackResult = await callbackFn(mongooseSession);

    // if transaction is successful, commit the changes
    await mongooseSession.commitTransaction();

    // return the result of the callback function
    return callbackResult;
  } catch (err) {
    // if an error occurs, abort the transaction
    await mongooseSession.abortTransaction();

    // re-throw the error to be handled by the caller's asyncHandler
    throw err;
  } finally {
    // end the session
    mongooseSession.endSession();
  }
}
