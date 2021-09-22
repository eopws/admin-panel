FROM node:12.13-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
#--only=development

RUN npm install rimraf

COPY . .

# RUN npm rebuild bcrypt --build-from-source

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install rimraf

COPY . .

# RUN npm rebuild bcrypt --build-from-source

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]