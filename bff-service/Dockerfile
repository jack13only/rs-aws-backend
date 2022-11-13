# DEVELOPMENT
FROM node:16-alpine As development
WORKDIR /bff-app
COPY *.json ./
RUN npm ci
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["node", "dist/indes.js"]