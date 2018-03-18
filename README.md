Code for Heroku server for virtualstocks.io

# Generate Service Account Key
This step is necessary for node to be able to access firebase.
Download the service account json file from Google Cloud Platform and store it as `/keys/firebase.json`.

See here for more details: https://firebase.google.com/docs/firestore/quickstart

# Generate SSL Certificates (Self Signed)
https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node

Key: `/keys/key.pem`
Cert: /keys/cert.pem

```
> openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 3650

> openssl rsa -in keytmp.pem -out key.pem

> mv key.pem keys

> mv cert.pem keys

> rm keytmp.pem
```

# Google Cloud Platform Setup
Use Google Cloud Platform's free compute engine for free, scalable, reliable hosting.

### Service File
/etc/systemd/system/virtualstocks.service
```
[Unit]
Description=VirtualStocks server

[Service]
ExecStart=/usr/bin/docker run --name=virtualstocks -p 443:443 thecodingwizard/virtualstocks
ExecStop=/usr/bin/docker stop virtualstocks
ExecStopPost=/usr/bin/docker rm virtualstocks
Restart=always
User=root
Group=nogroup  
Environment=PATH=/usr/bin:/usr/local/bin
Environment=PORT=443

[Install]
WantedBy=multi-user.target
```

Make sure to replace the docker registry URL with the appropriate command.

Copy to /etc/systemd/system. Start with systemctl start virtualstocks. Enable to run on boot with systemctl enable virtualstocks. See logs with journalctl -u virtualstocks.

https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service

# Updating Docker
```
docker build -t virtualstocks .

docker tag virtualstocks thecodingwizard/virtualstocks

docker push thecodingwizard/virtualstocks
```

On GCP:
```
sudo systemctl stop virtualstocks

docker pull thecodingwizard/virtualstocks

sudo systemctl start virtualstocks
```