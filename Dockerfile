
FROM google/debian:wheezy
MAINTAINER Alberto Moreno <albertinivva@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update

RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y ruby ruby-dev
RUN gem install compass --version 0.12.6

RUN npm install -g gulp
RUN npm install -g supervisor

RUN groupadd -r -g 1000 docker && \
    useradd -r -g docker -u 1000 alberto && \
    mkdir /home/alberto && \
    chown alberto:docker /home/alberto

COPY . /opt/web
WORKDIR /opt/web

RUN npm i

USER alberto

CMD node index.js
