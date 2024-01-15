import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../../shared/logger';
import { DBClient } from '../../../shared/clients';
import { IDevice } from '@solarapp/lib';

export class Device {
  static async Post(request: FastifyRequest, reply: FastifyReply) {
    try {
      const prisma = DBClient();
      const requestBody = {
        userId: (request.body as any)?.userId as number,
        device: (request.body as any)?.device as IDevice,
      };
      logger(requestBody);

      const response = await prisma.device.create({
        data: {
          title: requestBody.device.title,
          serialNo: requestBody.device.serialNo,
          type: requestBody.device.type,
          comments: requestBody.device.comments,
          deviceSpecs: requestBody.device.deviceSpecs as any,
          locationObject: requestBody.device.locationObject as any,
          userId: requestBody.userId,
        },
      });
      reply.status(200).send({ response });
    } catch (error) {
      logger(error);
      throw new Error('Could not register device');
    }
  }
  static async Get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const prisma = DBClient();
      const requestBody = {
        userId: (request.params as unknown as any)?.userId as string,
      };

      const devices = await prisma.device.findMany({
        where: {
          userId: parseInt(requestBody.userId),
          deletedAt: null,
        },
        orderBy: {
          id: 'desc',
        },
      });

      const promises = devices.map(async (device) => {
        const creditsSum = await prisma.credits.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            deviceId: device.id,
          },
        });
        return {
          ...device,
          credits: creditsSum._sum.amount ?? 0,
        } as any;
      });
      const devicesWithCredits = (await Promise.allSettled(promises))?.map(
        (val: any) => val?.value
      );
      reply.status(200).send({ response: devicesWithCredits });
    } catch (error) {
      logger(error);
      throw new Error('Could not fetch devices');
    }
  }
  static async Delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deviceId = (request.params as any).id;
      const prisma = DBClient();

      const response = await prisma.device.update({
        where: {
          id: parseInt(deviceId),
        },
        data: {
          deletedAt: new Date(),
        },
      });

      reply.status(200).send({ response });
    } catch (error) {
      throw new Error('Could not delete');
    }
  }
  static async Put(request: FastifyRequest, reply: FastifyReply) {
    try {
      const device = (request.body as any)?.device as IDevice;
      const prisma = DBClient();

      const response = await prisma.device.update({
        where: {
          id: device.id,
        },
        data: device as any,
      });
      reply.status(200).send({ response: response });
    } catch (error) {
      throw new Error('Could not update');
    }
  }
}
