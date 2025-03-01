FROM node:23-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./

RUN rm -rf node_modules && npm install && npm install --optional
COPY . .

EXPOSE 4000 3000
ENV HOSTNAME="0.0.0.0"
CMD ["npm", "start"]