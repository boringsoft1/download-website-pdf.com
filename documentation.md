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

put publish contents into this folder
```
sudo mkdir -p /var/www/download-website-pdf.com
```

create nginx config
```
sudo nano /etc/nginx/sites-available/download-website-pdf.com
```


```
server {
    server_name download-website-pdf.com www.download-website-pdf.com;

    root /var/www/download-website-pdf.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```
sudo certbot --nginx -d download-website-pdf.com -d www.download-website-pdf.com --force-renewal
```