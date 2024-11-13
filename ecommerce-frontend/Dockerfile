# Step 1: Build the frontend
FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies (including react-scripts)
COPY ./ecommerce-frontend/package.json ./ecommerce-frontend/package-lock.json ./
RUN npm install  # Ensure that all dependencies are installed, including react-scripts

# Copy the rest of the application code
COPY ./ecommerce-frontend ./

# Run build command
RUN npm run build

# Step 2: Copy the build files to the backend public directory (ecommerce-backend/public)
FROM node:18 AS prod

WORKDIR /app

# Copy the built frontend into the backend public directory
COPY --from=build /app/build /app/ecommerce-backend/public

# Install Caddy to serve the frontend
RUN apt-get update && apt-get install -y caddy

# Expose Caddy port
EXPOSE 80
EXPOSE 443

# Start Caddy to serve the frontend
CMD ["caddy", "reverse-proxy", "--to", "backend:5000", "--config", "/etc/caddy/Caddyfile"]
