import { FastifyReply, FastifyRequest } from 'fastify';
import { showPVForecast } from '../../utils/forcast';
import { IDevice, ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { FORECAST_DAYS } from '../../utils/constants';
import logger from '../../../shared/logger';

export class Forecast {
  static async Post(request: FastifyRequest, reply: FastifyReply) {
    try {
      const device = (request.body as any)?.device as IDevice;
      const latitude = (device.locationObject as any)?.latitude;
      const longitude = (device.locationObject as any)?.longitude;
      if (device.type === 'solar geyser') {
        const forcast = await showPVForecast(
          latitude,
          longitude,
          (device.deviceSpecs as ISolarGeyser).capacity,
          (device.deviceSpecs as ISolarGeyser)?.occupants,
          FORECAST_DAYS
        );
        return reply.send({ forcast });
      }
      if (device.type === 'solar panel') {
        const forcast = await showPVForecast(
          latitude,
          longitude,
          (device.deviceSpecs as ISolarPanel).size,
          (device.deviceSpecs as ISolarPanel)?.powerOutput,
          FORECAST_DAYS
        );
        return reply.send({ forcast });
      }
    } catch (error) {
      logger(error);
    }
  }
}
