 FROM node:20

# Create app directory
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# AUTOMATIC INSTALLATION: This installs node_modules inside the container
RUN npm ci

# Copy the rest of your server source code
COPY . .
# server running on
EXPOSE 3000
# Command to run the server "npm run dev"
CMD ["npm", "run", "dev"]