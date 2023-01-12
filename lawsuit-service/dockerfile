FROM node:14.19-alpine

ADD package.json /tmp/package.json

ADD package-lock.json /tmp/package-lock.json

RUN rm -rf build

RUN cd /tmp && npm install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

COPY /scripts ./

RUN yarn build

ENTRYPOINT ["sh", "/src/start.sh"]