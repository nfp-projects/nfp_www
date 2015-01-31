M node:0.11
RUN useradd -ms /bin/bash deploy
RUN npm install -g jshint jscs morkdown markdown-live
WORKDIR /home/deploy
USER deploy


