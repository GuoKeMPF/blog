
FROM nginx:1.21.4
EXPOSE 80
EXPOSE 443

WORKDIR /blog_nginx


COPY ./ /etc/nginx/
COPY ./blog_static /blog_static
COPY ./ssl /etc/nginx/ssl

HEALTHCHECK --interval=30s --timeout=5s --retries=10 \
    CMD (curl --fail http://localhost:8000/ && curl --fail http://localhost:8001/) || exit 1
