FROM mcr.microsoft.com/playwright/java:v1.42.0-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install --force
RUN npx playwright install 