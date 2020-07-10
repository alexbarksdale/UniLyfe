FROM node:12

WORKDIR /usr/backend

COPY package.json ./
COPY ormconfig.ts ./
COPY tsconfig.json ./
COPY .env ./

RUN yarn install --force

COPY . ./

EXPOSE 4000

CMD ["yarn", "start"]
