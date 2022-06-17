FROM node:17.9.1-slim

ARG BACKEND_URL
ARG SENTENCE_BUILDER_API_PRIVATE_PATH

RUN mkdir -p /workspace
WORKDIR /workspace

COPY package.json tsconfig.json ./
RUN npm install
COPY public ./public
COPY src ./src

RUN echo REACT_APP_BACKEND_URL=${BACKEND_URL}${SENTENCE_BUILDER_API_PRIVATE_PATH} > .env
EXPOSE 3000

CMD ["npm", "start"]