FROM node:18

WORKDIR /app
COPY . .

RUN npx npm install && npx npm run build:client:prod

ENV HOST=0.0.0.0

ENTRYPOINT ["npx", "npm", "run"]
CMD ["start"]
