FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY . .

USER root

RUN npm i -g yarn
RUN yarn install

ENV NODE_ENV=production

CMD ["sh", "-c", "yarn PORTAL:start"]
