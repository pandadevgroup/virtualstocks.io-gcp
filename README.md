Code for Heroku server for virtualstocks.io

# Generate Service Account Key
This step is necessary for node to be able to access firebase.
Download the service account json file from Google Cloud Platform and store it as `/keys/firebase.json`.

However, for Heroku, simply run:

```
heroku config:set FIREBASE_KEY="$(cat keys/firebase.json)"
```

*Make sure everything in that file is on the first line.*

See here for more details: https://firebase.google.com/docs/firestore/quickstart