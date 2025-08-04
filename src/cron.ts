import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { checkTasksDueSoon } from './controllers/notification.controller.js';

dotenv.config();

async function runCronJob() {
  try {
    await checkTasksDueSoon();
    console.log('Checked for tasks due soon.');
  } catch (err) {
    console.error('Error checking tasks due soon:', err);
  }
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Cron Worker: DB connected');
    await runCronJob();
    cron.schedule('0 * * * *', runCronJob);
    console.log('Cron Worker started, will check every hour.');
  } catch (err) {
    console.error('Cron Worker failed to start:', err);
    process.exit(1);
  }
}

start();
