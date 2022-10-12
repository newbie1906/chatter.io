FROM python:3.10.7
EXPOSE 8000
WORKDIR /app
COPY "./backend/requirements.txt" /app
RUN pip install -r requirements.txt
COPY "./backend/" /app
RUN ls /app
RUN echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0"]

