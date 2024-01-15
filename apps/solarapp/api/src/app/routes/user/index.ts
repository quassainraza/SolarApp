import { FastifyInstance } from 'fastify';
import { Users } from './controller';

export default async (fastify: FastifyInstance) => {
  fastify.post('/', Users.Post);
  fastify.post('/login', Users.Login);
  fastify.put('/update', Users.Put);
  fastify.get('/dashboard/:userId', Users.GetDashboard);
};
