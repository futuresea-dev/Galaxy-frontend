FROM node:16-alpine as builder

WORKDIR /precache
COPY package.json yarn.lock .npmrc  ./
RUN yarn install

WORKDIR /build
COPY ./ ./
RUN cp -a /precache/node_modules ./

RUN yarn run build


FROM nginx:1-alpine

COPY --from=builder /build/dist /var/www/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
