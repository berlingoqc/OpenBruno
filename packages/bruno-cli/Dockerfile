FROM node:18-bullseye-slim

ARG CLI_VERSION

RUN echo "@berlingoqc:registry=https://npm.pkg.github.com" >> $HOME/.npmrc

RUN npm install -g @berlingoqc/openbruno-cli:${CLI_VERSION}
