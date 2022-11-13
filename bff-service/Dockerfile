# DEVELOPMENT
FROM node:18-alpine As dev
WORKDIR /docker-app
COPY *.json ./
RUN npm ci
COPY . .
# COPY .env ./

# FOR PRODUCTION
FROM node:18-alpine As build
WORKDIR /docker-app
COPY *.json ./
COPY --from=dev /docker-app/node_modules ./node_modules
COPY . .
# COPY .env ./
RUN npm run build
ENV NODE_ENV prod
RUN npm ci --only=prod && npm cache clean --force

# PRODUCTION
FROM node:18-alpine As prod
COPY --from=build /docker-app/node_modules ./node_modules
COPY --from=build /docker-app/dist ./dist
# COPY .env ./
EXPOSE 3000
CMD [ "node", "dist/index.js" ]