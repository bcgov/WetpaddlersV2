FROM node:20-alpine
COPY . .
RUN npm ci
ENV NODE_OPTIONS=--max-old-space-size=7000
RUN npm ci --legacy-peer-deps
RUN npm run build
CMD [ "npm", "run", "preview" ]