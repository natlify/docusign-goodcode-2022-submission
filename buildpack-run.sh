ENV PHANTOMJS_VERSION=
ENV PHANTOMJS_PATH=/usr/local/bin/phantomjs

pwd
mkdir temp
cd temp 
curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar -jxf - && \
ls
pwd
