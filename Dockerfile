FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache yarn

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --flat --production=true

EXPOSE 8888

CMD ["node", "server"]
