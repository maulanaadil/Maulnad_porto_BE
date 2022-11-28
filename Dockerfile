FROM mhart/alpine-node:16 as builder

RUN mkdir -p /app
RUN mkdir -p /images

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

WORKDIR /app/dist

RUN mkdir -p /app/dist/images

EXPOSE 4500/tcp

ENTRYPOINT ["node", "server.js"]