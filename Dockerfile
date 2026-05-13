FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN chmod -R +x node_modules/.bin

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
