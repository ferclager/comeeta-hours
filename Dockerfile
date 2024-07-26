FROM node:20.16-bookworm-slim

COPY ["package.json", "package-lock.json", "/usr/src/"]
WORKDIR /usr/src
RUN npm install
COPY . .
CMD [ "tail", "-f", "/dev/null" ]