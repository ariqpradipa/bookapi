# Use a suitable base image for Node.js
FROM node:20.12.1-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl
RUN npm ci

COPY . .

# Expose the port on which your Fastify app runs
EXPOSE 5500

ENV ADDRESS=0.0.0.0 PORT=5500
RUN npx prisma generate
# Command to run the Fastify application (assuming it's named index.js)
# CMD ["sh", "-c", "npx prisma generate && npx ts-node src/index.ts"]
CMD ["npx", "ts-node", "src/index.ts"]