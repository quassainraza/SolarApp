import { ScheduleOptions, schedule } from 'node-cron';

export interface CronType {
  cronExpression: string;
  func: (now: Date | 'manual' | 'init') => void;
  options?: ScheduleOptions;
}

export const ScheduleJob = (job: CronType) => {
  schedule(job.cronExpression, job.func, job.options);
};
