# AI Trading Coach — FastAPI analytics engine.
# Runs behind the Aureon API (never exposed publicly): the API injects
# X-Coach-Secret and X-Account-Id so each user's trades are isolated in
# their own SQLite database under COACH_DB_DIR (mount a volume there).
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    COACH_DB_DIR=/data

WORKDIR /app

# Install dependencies first for better layer caching.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# App source.
COPY . .

# Persistent, isolated per-account databases live here — mount a volume.
RUN mkdir -p /data
VOLUME ["/data"]

EXPOSE 8000

# Start the API. Bind to all interfaces on the container port.
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
