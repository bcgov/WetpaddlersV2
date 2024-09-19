from python:3.11

RUN apt-get update && apt-get -y install git libsqlite3-dev zlib1g-dev build-essential

ARG TIPPACANOE_VERSION=main

RUN git clone --depth 1 https://github.com/felt/tippecanoe.git --branch ${TIPPACANOE_VERSION} --single-branch /tmp/tippecanoe-src

WORKDIR /tmp/tippecanoe-src

RUN make && make install

RUN apt-get -y install python3 python3-pip python3-dev python-is-python3 curl

RUN curl -sSL https://install.python-poetry.org > /tmp/install.python-poetry.org

# Update pip
RUN python3 -m pip install --upgrade pip

# Install poetry
RUN cat /tmp/install.python-poetry.org | python3 -

# Configure Poetry
ENV POETRY_VERSION=1.2.0
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=/opt/poetry-venv
ENV POETRY_CACHE_DIR=/opt/.cache

# Install poetry separated from system interpreter
RUN python3 -m venv $POETRY_VENV \
  && $POETRY_VENV/bin/pip install -U pip setuptools \
  && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

# Add `poetry` to PATH
ENV PATH="${PATH}:${POETRY_VENV}/bin"

WORKDIR /api

# Install dependencies
COPY . /api
RUN poetry install

# Run your app
expose 8000
CMD [ "poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]