FROM node:12

WORKDIR /usr/backend

COPY package.json ./
COPY ormconfig.json ./
COPY tsconfig.json ./
COPY .env ./

RUN yarn install --force

COPY . ./

EXPOSE 4000

CMD ["yarn", "start"]
