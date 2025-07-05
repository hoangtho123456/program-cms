
FROM node:18.0.0

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
