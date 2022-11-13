# DEVELOPMENT
FROM node:16-alpine As development
WORKDIR /bff-app
COPY * ./
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]