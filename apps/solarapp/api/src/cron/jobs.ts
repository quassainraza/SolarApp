import { ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { calculateDailyCarbonCredits } from '../app/utils/creditsUtils';
import { DBClient } from '../shared/clients';
import { CronType } from './types/cron';
import logger from '../shared/logger';
import { randomUUID } from 'crypto';

export const creditGenerator: CronType = {
  cronExpression: '* * 12 * * *',
  func: async (now) => {
    const uuid = randomUUID();
    logger('[creditGenerator] @', now);
    const dbClient = DBClient();
    const devices = await dbClient.device.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const promises = [];
    devices.forEach((device) => {
      if (device.type === 'solar panel') {
        promises.push(
          calculateDailyCarbonCredits(
            (device.locationObject as any)?.latitude,
            (device.locationObject as any)?.longitude,
            (device.deviceSpecs as unknown as ISolarPanel).size as any,
            (device.deviceSpecs as unknown as ISolarPanel).powerOutput as any,
            device.id
          )
        );
      }
      if (device.type === 'solar geyser') {
        promises.push(
          calculateDailyCarbonCredits(
            (device.locationObject as any)?.latitude,
            (device.locationObject as any)?.longitude,
            (device.deviceSpecs as unknown as ISolarGeyser).capacity as any,
            (device.deviceSpecs as unknown as ISolarGeyser).occupants as any,
            device.id
          )
        );
      }
    });

    const calculations = await Promise.allSettled(promises);

    const insertions = calculations.map((calculation) => {
      const data = (calculation as any)?.value;
      return dbClient.credits.create({
        data: {
          amount: data?.dailyCarbonReduction,
          deviceId: data?.deviceId,
          cronUuid: uuid,
        },
      });
    });
    await Promise.allSettled(insertions);
  },
};
