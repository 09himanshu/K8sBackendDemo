FROM node:22.09 
WORKDIR app/
COPY package*.json ./
RUN npm install
COPY . .
CMD ['node', 'src/server.js']
