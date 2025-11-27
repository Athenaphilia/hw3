# COS 498 Homework 3

Corey Kaulenas

## Description

This is a pdf file server. It is very lightly tested and is not secure, and was also made for
a class. Do not use this for any serious purpose.

## Install and Run

Clone the repository: `git clone https://github.com/Athenaphilia/hw3.git`

Run `docker compose up --build -d`

Your server should now be running.

## Documentation

### Database Schema

There exists one document table in a sqlite3 database. This is it's schema:

```
filename TEXT PRIMARY KEY,
path TEXT NOT NULL,
title TEXT NOT NULL,
description TEXT
```

The fields are self explanatory.

### Routing

The routing module: `pdf-server/routing/routing.js` handles all routing that is not covered
by middleware.

This doesn't handle the static files. It handles the routes like this:

- "/" -> Render home.hbs view
- "/pdfList" -> Render pdfList view.
- "/documents/{pdfName}" -> Serves the pdf file if it exists, else 404.

There are modules that handle the validation of whether a pdf exists.

### Setup Steps

This uses nginx-proxy-manager as a reverse proxy. You'll notice that this repository doesn't
contain this. That is because it is in a separate docker container to make it easier on me later.
The docker-compose.yml of that file is below:

```yaml
services:
  nginx-proxy-manager:
    image: "jc21/nginx-proxy-manager:latest"
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "5001:81"
    volumes:
      - ./nginx/data:/data
      - ./nginx/letsencrypt:/etc/letsencrypt
```

I then registered the certificate using lets encrypt, and added a proxy host that pointed
(www.)coreykaulenas.com to (server-ip):3000.

The domain was registered with cloudflare.
