# Step 1: Build the frontend
FROM node:18 AS build

WORKDIR /app
COPY ./ecommerce-frontend/package.json ./ecommerce-frontend/package-lock.json ./
RUN npm install
COPY ./ecommerce-frontend ./
RUN npm run build

# Step 2: Copy the build files to the backend public directory (ecommerce-backend/public)
FROM caddy:latest AS prod

# Copy the built frontend into the public directory of the backend
COPY --from=build /app/build /usr/share/caddy

# Expose the frontend (Caddy automatically serves on port 80 by default)
EXPOSE 80
