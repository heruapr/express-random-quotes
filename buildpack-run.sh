heroku config:set BUILDPACK_RUN='echo "Hello World":wget http://download.redis.io/redis-stable.tar.gz:tar xvzf redis-stable.tar.gz:cd redis-stable:sudo make install:redis-server