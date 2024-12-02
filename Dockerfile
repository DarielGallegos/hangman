ARG PYTHON_VERSION=3.12.0
ARG PORT_SERVER=8000
FROM python:${PYTHON_VERSION}-slim as base

RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /hangman

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container.
COPY . .

# Expose the port that the application listens on.
EXPOSE ${PORT_SERVER}

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Run the application.
CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]