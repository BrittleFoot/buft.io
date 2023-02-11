
FROM node:alpine3.16 AS build-node

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:alpine3.16 AS deploy-node

WORKDIR /app
COPY --from=build-node /app/package.json .
COPY --from=build-node /app/build .


CMD ["node", "index.js"]