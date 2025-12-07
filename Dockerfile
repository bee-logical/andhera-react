# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm run docs:build

# ---------- RUNTIME STAGE ----------
FROM nginx:1.27-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Replace default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built docs from first stage
COPY --from=builder /app/docs/dist /usr/share/nginx/html

# Nginx listens on 80 inside container
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
