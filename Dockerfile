FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY backend/ ./backend

COPY frontend/ ./frontend

EXPOSE 3000

CMD ["yarn", "start"]
