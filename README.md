Code for Heroku server for virtualstocks.io

# Generate Service Account Key
This step is necessary for node to be able to access firebase.
Download the service account json file from Google Cloud Platform and store it as `/keys/firebase.json`.

See here for more details: https://firebase.google.com/docs/firestore/quickstart

# Google Cloud Platform Setup
Use Google Cloud Platform's free compute engine for free, scalable, reliable hosting.

### Service File
/etc/systemd/system/virtualstocks.service
```
[Unit]
Description=VirtualStocks server

[Service]
ExecStart=/usr/bin/docker run --name=virtualstocks -p 80:80 thecodingwizard/virtualstocks
ExecStop=/usr/bin/docker stop virtualstocks
ExecStopPost=/usr/bin/docker rm virtualstocks
Restart=always
User=root
Group=nogroup  
Environment=PATH=/usr/bin:/usr/local/bin

[Install]
WantedBy=multi-user.target
```

Make sure to replace the docker registry URL with the appropriate command.

Copy to /etc/systemd/system. Start with systemctl start virtualstocks. Enable to run on boot with systemctl enable virtualstocks. See logs with journalctl -u virtualstocks.

https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service