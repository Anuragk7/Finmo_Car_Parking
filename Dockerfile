

# Set working directory for all build stages.
# Stage 1: Build
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the NestJS project
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only built files and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port your app runs on (default is 3000)v
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main.js"]
