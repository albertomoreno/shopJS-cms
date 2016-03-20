
FROM google/debian:wheezy
MAINTAINER Alberto Moreno <albertinivva@gmail.com>

RUN apt-get update && \
    apt-get install -y curl build-essential

RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y ruby ruby-dev
RUN gem install sass rb-inotify

RUN npm install -g gulp
RUN npm install -g supervisor

RUN groupadd -r -g 1000 docker && \
    useradd -r -g docker -u 1000 alberto && \
    mkdir /home/alberto && \
    chown alberto:docker /home/alberto

COPY . /opt/web
WORKDIR /opt/web

RUN npm i

ENV SASS_PATH /opt/web

USER alberto

CMD node index.js
