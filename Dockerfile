FROM node:12.12.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

COPY . .

CMD [ "node", "server.js" ]
