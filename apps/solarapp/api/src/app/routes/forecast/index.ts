import { FastifyInstance } from 'fastify';
import { Forecast } from './controller';

export default async (fastify: FastifyInstance) => {
  fastify.post('/', Forecast.Post);
};
