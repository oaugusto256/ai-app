# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.13.2

FROM python:${PYTHON_VERSION}-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

COPY server_python/ .

RUN uv sync --frozen

EXPOSE 5000

CMD ["uv", "run", "--", "flask", "--app", "main.py", "run", "--host", "0.0.0.0"]
