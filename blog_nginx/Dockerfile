
FROM nginx:1.21.4
EXPOSE 80
EXPOSE 443

WORKDIR /blog_nginx

COPY --from=blog_admin /blog_admin/dist /blog_static/admin/

COPY nginx.conf /etc/nginx/nginx.conf
COPY mapanfeng.com_bundle.crt /etc/nginx/ssl/mapanfeng.com_bundle.crt
COPY mapanfeng.com.key /etc/nginx/ssl/mapanfeng.com.key

