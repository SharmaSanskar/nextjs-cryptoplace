FROM node:17-alpine

WORKDIR /client

COPY ./package.json /client/package.json

RUN npm install

COPY . /client

EXPOSE 3000

CMD ["npm", "run", "dev"]