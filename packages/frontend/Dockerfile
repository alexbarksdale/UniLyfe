FROM node:12

WORKDIR /usr/frontend

COPY package.json ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]
