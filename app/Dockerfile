FROM node:20-alpine
RUN mkdir /app
RUN chgrp -R 0 /app && chmod -R g+rwX /app
WORKDIR /app
COPY . .
RUN npm ci
ENV NODE_OPTIONS=--max-old-space-size=7000
RUN npm ci --legacy-peer-deps
RUN npm run build
CMD [ "npm", "run", "preview" ]
