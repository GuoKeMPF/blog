FROM python:3.10.0


WORKDIR /blog_server
ENV PYTHONUNBUFFERED 1
COPY ./ ./
RUN pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip config set install.trusted-host mirrors.aliyun.com
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt
RUN chmod +777 start.sh
CMD ["/bin/sh","start.sh"]