FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install serve (HTTP server).
RUN npm install serve -g

# Copy app build and scripts.
COPY build/ ./build
COPY scripts/ ./scripts

EXPOSE 5000
CMD [ "npm", "run", "serve" ]
