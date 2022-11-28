FROM mhart/alpine-node:16 as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

WORKDIR /app/dist

RUN mkdir -p /images

EXPOSE 4500

ENTRYPOINT ["node", "server.js"]