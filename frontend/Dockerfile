FROM node:20-alpine as base

FROM base AS deps
# why libc6-compat might be needed:
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./

RUN npm ci


# Rebuild the source code only when needed
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.prod .env

RUN npm run build

# Production
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# for template files, env variables will be replaced and the file is copied to conf.d/
COPY nginx.conf /etc/nginx/templates/default.conf.template

# copy build web files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
