






# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package.json ./
COPY .npmrc ./

# Install any needed dependencies
ENV NPM_TOKEN=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

RUN npm run update

RUN npm i

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 6555

# Start the application
CMD ["npm", "start"]
