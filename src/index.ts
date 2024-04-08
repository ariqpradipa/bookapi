import { Prisma, PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors';
import routes from './routes';

const PORT = parseInt(process.env.PORT || '3000', 10);

const prisma = new PrismaClient()
const app = fastify()

app.decorate('prisma', prisma);

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
app.register(routes)

if (require.main === module) {
  // called directly i.e. "node app"
  app.listen({ port: PORT }, (err: any) => {
    if (err) console.error(err)
    console.log(`server listening on ${PORT}`)
  })
} else {
  // required as a module => executed on aws lambda
  module.exports = app
}