echo "start server"

export PROJECT_ENV=product

python3 ./manage.py runserver 0.0.0.0:8000
