FROM nginx:alpine

RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/kiedytancze.pl.conf /etc/nginx/sites-enabled/

COPY app/ /var/www/kiedytancze.pl/public/
COPY config/ /etc/nginx/
