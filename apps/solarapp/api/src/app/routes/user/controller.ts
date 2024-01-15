import { DBClient } from '../../../shared/clients';
import { FastifyRequest, FastifyReply } from 'fastify';
import logger from '../../../shared/logger';
import { IUser } from '@solarapp/lib';

export class Users {
  static async Post(req: FastifyRequest, rep: FastifyReply) {
    try {
      const prisma = DBClient();
      logger('req.body');
      const requestBody = req.body as IUser;
      logger(requestBody);
      const response = await prisma.user.create({
        data: {
          email: requestBody.email,
          firstname: requestBody.firstname,
          telephone: requestBody.telephone,
          password: requestBody.password,
          avatar: requestBody.avatar,
          lastname: requestBody.lastname,
        },
      });
      logger('response');
      logger(response);

      rep.status(200).send({
        ...response,
      } as IUser);
    } catch (error) {
      logger(error);
      if (error.code === 'P2002') {
        throw new Error('Cannot create account, already exists');
      }
    }
  }

  static async Login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = req.body as IUser;
      const prisma = DBClient();

      const response = await prisma.user.findFirst({
        where: {
          email: {
            equals: requestBody.email,
            mode: 'insensitive',
          },
          password: requestBody.password,
        },
      });

      await prisma.user.update({
        data: {
          lastLogin: new Date(),
        },
        where: {
          id: response.id,
          deletedAt: null,
        },
      });
      logger(`[Authenticated] ${response.email}`);
      if (response) {
        reply.status(200).send({
          ...response,
        });
      } else {
        throw new Error('Invalid email or Password');
      }
    } catch (error) {
      throw new Error('Invalid email or Password');
    }
  }

  static async Put(req: FastifyRequest, reply: FastifyReply) {
    const client = DBClient();

    const updatedData = req.body as any as IUser;
    if (!updatedData.email) {
      throw new Error(`Email cannot be empty`);
    }
    try {
      const response = await client.user.update({
        data: {
          avatar: updatedData?.avatar,
          createdAt: updatedData?.createdAt,
          deletedAt: updatedData?.deletedAt,
          updatedAt: new Date(),
          email: updatedData?.email,
          firstname: updatedData.firstname,
          lastLogin: updatedData.lastLogin,
          lastname: updatedData.lastname,
          // TODO NEW ENDPOINT FOR SECURITY UPDATES
          // password: updatedData.password,
          telephone: updatedData.telephone,
        },
        where: {
          id: updatedData.id,
        },
      });

      reply.status(200).send({ response });
    } catch (error) {
      logger(error);
      throw new Error(`Could not update data for ${updatedData.email}`);
    }
  }

  static async GetDashboard(req: FastifyRequest, reply: FastifyReply) {
    const userId = (req.params as any)?.userId;

    logger('Sending summary for', userId);
    const prisma = DBClient();

    const devices = await prisma.device.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        credits: {
          _count: 'asc',
        },
      },
      take: 3,
    });

    const promises = devices.map(async (device) => {
      const sum = await prisma.credits.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          deviceId: device.id,
        },
      });
      return {
        ...device,
        credits: sum._sum.amount ?? 0,
      } as any;
    });

    const richDevicesPromises = await Promise.allSettled(promises);
    const richDevices = richDevicesPromises?.map((val: any) => val.value);

    const totalCredits = (
      richDevices.length
        ? [...richDevices.map((device) => device?.credits)]
        : [0]
    )?.reduce((a: number, b: number) => a + b);

    const today = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(today.getDate() - 7);

    const creditsLastWeek = await prisma.credits.groupBy({
      by: ['deviceId'],
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: lastWeekDate,
        },
      },
    });

    logger(creditsLastWeek);

    const highestCredits = await prisma.credits.aggregate({
      _max: {
        amount: true,
      },
      where: {
        device: {
          OR: [...devices.map((device) => ({ id: device.id }))],
        },
      },
    });

    const response = {
      devices: richDevices,
      totalCredits,
      creditsLastWeek: creditsLastWeek.slice(0, 5),
      highestCredits: highestCredits._max.amount,
    };
    // logger(response);
    reply.status(200).send(response);
  }
}
