
FROM nginx:1.21.4
EXPOSE 80
EXPOSE 443

WORKDIR /blog_nginx


COPY ./ /etc/nginx/
COPY ./blog_static /blog_static
COPY ./ssl /etc/nginx/ssl

