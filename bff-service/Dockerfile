# DEVELOPMENT
FROM node:16-alpine As development
WORKDIR /bff-app
COPY *.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "startts"]