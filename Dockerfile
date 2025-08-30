# Build frontend
FROM node:20 AS frontend
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# Build backend
FROM node:20 AS backend
WORKDIR /app
COPY server ./server
COPY package*.json ./
RUN npm install

# Final stage
FROM node:20
WORKDIR /app
COPY --from=frontend /app/dist ./public
COPY --from=backend /app/server ./server
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 4000
CMD ["node", "server/index.js"]