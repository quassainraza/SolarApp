import { FastifyInstance } from 'fastify';
import { Credits } from './controller';

export default async (fastify: FastifyInstance) => {
  fastify.post('/calculate', Credits.Post);
  fastify.get('/', Credits.Get);
};
