FROM mhart/alpine-node:16 as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npx esbuild ./src/server.ts --bundle --platform=node --outfile=build/server.js

FROM mhart/alpine-node:16 as app

ENV NODE_ENV=production

RUN mkdir -p /app

WORKDIR /app

COPY --chown=node:node --from=builder /app/build/server.js /app

EXPOSE 4500

ENTRYPOINT ["node", "server.js"]