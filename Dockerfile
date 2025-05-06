FROM node:22.15.0
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
