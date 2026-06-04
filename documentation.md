## Backlog

- remove unnecessary files
- add contacts page
- add feedback page


## Getting started

```
npm -i
```

### Startup

start
```
npm run start
```

build
```
npm run build
```

### Deployment

```
sudo nano /etc/nginx/sites-available/download-website-pdf.io
```


```
server {
    server_name download-website-pdf.com www.download-website-pdf.com;

    root /var/www/download-website-pdf.io;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```
sudo certbot --nginx -d boringsoft.io -d www.boringsoft.io -d download-website-pdf.com -d www.download-website-pdf.com
```