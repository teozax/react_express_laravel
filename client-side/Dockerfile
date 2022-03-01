FROM node:14
WORKDIR /client-side
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
