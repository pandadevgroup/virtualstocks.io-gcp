FROM node:9.8.0-slim

WORKDIR /app
ADD . /app

RUN npm install
RUN npm run build

EXPOSE 80
ENV PORT 80

CMD ["node", "build/index.js"]