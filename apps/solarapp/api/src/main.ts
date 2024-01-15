import Fastify from 'fastify';
import { app } from './app/app';
import { creditGenerator } from './cron/jobs';
import { ScheduleJob } from './cron/types/cron';
const host = '0.0.0.0';
const port = 1337;
import logger from './shared/logger';
import fs from 'fs';
import path from 'path';
// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '.private', 'privkey1.pem')),
    cert: fs.readFileSync(path.join(__dirname, '.private', 'cert1.pem')),
  },
});

// Register your application as a normal plugin.
server.register(app);

server.setErrorHandler((error, req, reply) => {
  reply.status(400).send(error);
});

// Start listening.
server.listen({ port, host }, (err, address) => {
  if (err) {
    logger(err);
  } else {
    logger(address);
    logger(server.printRoutes());
    ScheduleJob(creditGenerator);
    process.on('SIGINT', async () => {
      logger('Closing server gracefully...');
      await server.close();
      logger('\nServer closed');
      process.exit(0);
    });
  }
});
