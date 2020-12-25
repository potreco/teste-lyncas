FROM node:15.4 AS build

COPY ./package.json .
RUN yarn

COPY . .
RUN yarn build

FROM nginx:alpine
LABEL maintainer="Patrick Jean Meurer <potreco@live.com>" \
  description="Container simples para hospedar o teste da Lyncas"

COPY --from=build ./build/. /usr/share/nginx/html
