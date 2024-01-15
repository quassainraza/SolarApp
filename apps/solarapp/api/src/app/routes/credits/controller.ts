import { FastifyReply, FastifyRequest } from 'fastify';
import { calculateDailyCarbonCredits } from '../../utils/creditsUtils';
import { IDevice, ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { DBClient } from '../../../shared/clients';

export class Credits {
  static async Post(request: FastifyRequest, reply: FastifyReply) {
    const device = (request.body as any)?.device as IDevice;
    let response: { dailyCarbonReduction: any; deviceId?: number };
    if (device.type === 'solar panel') {
      response = await calculateDailyCarbonCredits(
        (device.locationObject as any)?.latitude,
        (device.locationObject as any)?.longitude,
        (device.deviceSpecs as unknown as ISolarPanel).size as any,
        (device.deviceSpecs as unknown as ISolarPanel).powerOutput as any,
        device.id
      );
    }
    if (device.type === 'solar geyser') {
      response = await calculateDailyCarbonCredits(
        (device.locationObject as any)?.latitude,
        (device.locationObject as any)?.longitude,
        (device.deviceSpecs as unknown as ISolarGeyser).capacity as any,
        (device.deviceSpecs as unknown as ISolarGeyser).occupants as any,
        device.id
      );
    }
    return reply.status(200).send({ credits: response.dailyCarbonReduction });
  }
  static async Get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const prisma = DBClient();
      const total = await prisma.credits.aggregate({
        _sum: {
          amount: true,
        },
      });
      reply.status(200).send({ total: total?._sum.amount });
    } catch (error) {
      throw new Error('Could not fetch credits');
    }
  }
}
