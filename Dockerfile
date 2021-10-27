FROM node:14 AS stage

WORKDIR /app
ENV DATABASE_URL="postgresql://prisma:prisma@db/tests?schema=public&connection_limit=60&pool_timeout=0"
COPY products.csv ./dist/
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "yarn", "docker:start" ]