FROM node:10.9.0

WORKDIR /app
COPY . .

RUN npx npm install

ENV HOST=0.0.0.0

COPY . /app

ENTRYPOINT ["npx", "npm", "run"]
CMD ["start"]