FROM node:16.14.2-alpine

WORKDIR /app/pro/server

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 8888

CMD ["npm", "run", "start:prod"]