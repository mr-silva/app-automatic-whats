FROM node:16-alpine as base

WORKDIR /home/node/app

COPY package*.json yarn.loc[k] ./

FROM base as build

COPY . .

RUN --mount=type=secret,id=.npmrc,target=/root/.npmrc yarn

RUN yarn build

FROM base

COPY --from=build /home/node/app/dist ./dist

RUN --mount=type=secret,id=.npmrc,target=/root/.npmrc yarn --production

CMD ["yarn", "api",]
