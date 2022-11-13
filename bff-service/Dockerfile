# DEVELOPMENT
FROM node:16-alpine As development
WORKDIR /docker-app
COPY *.json ./
RUN npm ci
COPY . .

# FOR PRODUCTION
FROM node:16-alpine As build
WORKDIR /docker-app
COPY *.json ./
COPY --from=development /docker-app/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

# PRODUCTION
FROM node:16-alpine As production
COPY --from=build /docker-app/node_modules ./node_modules
COPY --from=build /docker-app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/main.js" ]