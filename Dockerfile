FROM ubuntu

RUN apt-get update && apt-get install -y \
      ca-certificates \
      curl \
      pkg-config \
      python \
      git \
 && rm -rf /var/lib/apt/lists/*


# verify gpg and sha256: https://iojs.org/dist/v1.0.0/SHASUMS256.txt.gpg
# gpg: aka "Rod Vagg <rod@vagg.org>"
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D

ENV IOJS_VERSION 1.0.4

RUN curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/iojs-v$IOJS_VERSION-linux-x64.tar.gz" \
  && curl -SLO "https://iojs.org/dist/v$IOJS_VERSION/SHASUMS256.txt.asc" \
  && gpg --verify SHASUMS256.txt.asc \
  && grep " iojs-v$IOJS_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
  && tar -xzf "iojs-v$IOJS_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "iojs-v$IOJS_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc

RUN npm install -g spserver
RUN useradd -ms /bin/bash developer
WORKDIR /home/developer
USER developer

CMD [ "iojs" ]
