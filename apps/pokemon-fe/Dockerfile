FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm --force install

RUN npm install -g @angular/cli

COPY . .

WORKDIR /usr/src/app/apps/pokemon-fe

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]