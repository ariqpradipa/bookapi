// Read the .env file.
import dotenv from 'dotenv';
dotenv.config();

import { Prisma, PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors';
import routes from './routes';

const { ADDRESS = 'localhost', PORT = '5500' }: any = process.env;

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

app.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err: any) => {
  if (err) console.error(err)
  console.log(`server listening on ${PORT}`)
})