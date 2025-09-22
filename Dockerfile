
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p /app/.next

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development

# Start the application
CMD ["npm", "run", "dev"]