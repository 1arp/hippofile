FROM node:14 AS stage

WORKDIR /app
COPY products.csv ./dist/
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "yarn", "docker:start" ]