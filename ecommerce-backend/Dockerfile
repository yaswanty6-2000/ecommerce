# Use Node.js alpine base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (for better caching)
# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app
CMD ["npm", "start"]