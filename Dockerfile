FROM node:18-alpine
WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 9000

CMD yarn start