FROM node:14.19.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["npm", "start-prod"]