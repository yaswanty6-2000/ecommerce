# Step 1: Build the frontend
FROM node:18 AS build

WORKDIR /app
COPY ./ecommerce-frontend/package.json ./ecommerce-frontend/package-lock.json ./
RUN npm install
COPY ./ecommerce-frontend ./
RUN npm run build

# Step 2: Copy the build files to the backend public directory (ecommerce-backend/public)
FROM node:18 AS prod

WORKDIR /app
COPY --from=build /app/build /app/ecommerce-backend/public

# Install Caddy to serve the frontend
RUN apt-get update && apt-get install -y caddy

# Start Caddy to serve the frontend
CMD ["caddy", "reverse-proxy", "--to", "backend:5000", "--config", "/etc/caddy/Caddyfile"]
