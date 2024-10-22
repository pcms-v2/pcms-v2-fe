FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG ENV_MODE
ENV ENV_MODE=${ENV_MODE}
RUN if [ "$ENV_MODE" = "production" ]; then \
      npm run build:production; \
    elif [ "$ENV_MODE" = "docker" ]; then \
      npm run build:docker; \
    else \
      echo "ENV_MODE must be 'docker' or 'production'"; \
      exit 1; \
    fi

FROM nginx:alpine
WORKDIR /
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]