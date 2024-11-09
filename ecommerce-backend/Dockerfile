# Step 1: Install backend dependencies
FROM node:18

WORKDIR /app
COPY ./ecommerce-backend/package.json ./ecommerce-backend/package-lock.json ./
RUN npm install
COPY ./ecommerce-backend ./

# Step 2: Expose the API port and connect to MongoDB
EXPOSE 5000

# Start the backend server (replace this with your specific start command)
CMD ["npm", "start"]
