FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache yarn curl

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 8888

CMD ["node", "server"]
