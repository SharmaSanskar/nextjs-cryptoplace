FROM python:3.9

WORKDIR /server

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY ./.env /server/.env

COPY ./app /server/app

WORKDIR /server/app

# EXPOSE 5000

CMD ["python", "app.py"]