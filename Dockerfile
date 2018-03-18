FROM node:9.8.0-slim

WORKDIR /app
ADD . /app

RUN npm install
RUN npm run build

EXPOSE 443
ENV PORT 443

CMD ["node", "build/index.js"]