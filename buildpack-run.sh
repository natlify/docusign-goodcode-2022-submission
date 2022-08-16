ENV PHANTOMJS_VERSION=2.1.1
ENV PHANTOMJS_PATH=/usr/local/bin/phantomjs

pwd
mkdir temp
cd temp 
curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2
tar xjxf phantomjs-2.1.1-linux-x86_64.tar.bz2 
ls
pwd
