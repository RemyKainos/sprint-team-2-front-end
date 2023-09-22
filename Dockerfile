FROM node:14.19.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ARG BACK_URL

ENV BACK_URL ${BACK_URL}

EXPOSE 8080

CMD ["npm", "run", "start-prod"]