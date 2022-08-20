FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
# COPY yarn.lock ./
COPY . ./
RUN npm install
RUN npx prisma generate
ENV PORT=3000
CMD ["npm", "run", "start"]