
FROM node:12.18.3

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "src/index.ts" ]