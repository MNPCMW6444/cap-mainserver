FROM node:18

WORKDIR /apps

COPY package.json .

ENV NPM_TOKEN=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
RUN npm run update
RUN npm i

COPY . .

EXPOSE 6555

CMD [ "npm", "start" ]