FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:production


FROM nginx:alpine
WORKDIR /
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/extra.conf /etc/nginx/conf.d/extra.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]