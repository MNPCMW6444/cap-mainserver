FROM node:16

WORKDIR /apps

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6555

CMD [ "npm", "start" ]