import { FastifyInstance } from 'fastify';
import { Device } from './controller';

export default async (fastify: FastifyInstance) => {
  fastify.post('/', Device.Post);
  fastify.get('/:userId', Device.Get);
  fastify.delete('/:id', Device.Delete);
  fastify.put('/:id', Device.Put);
};
