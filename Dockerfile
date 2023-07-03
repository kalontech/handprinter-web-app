FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install serve (HTTP server).
RUN npm install serve -g

# Copy app build and scripts.
COPy ./* ./
COPY build/ ./build
COPY scripts/ ./scripts

EXPOSE 3000
CMD [ "npm", "run", "start" ]
