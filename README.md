# Dropbox AnyFetch Provider
> Visit http://anyfetch.com for details about AnyFetch.

AnyFetch provider for files stored in Dropbox

# How to install?
You'll need to define some environment variables

```bash
# Go to https://www.dropbox.com/developers/apps to ask for app id and secret
export DROPBOX_API_ID="dropbox-id"
export DROPBOX_API_SECRET="dropbox-secret"

# Provider URL, most probably https://your-host
export PROVIDER_URL="https://your-host"

# AnyFetch app id and secret
export ANYFETCH_API_ID="anyfetch-app-id"
export ANYFETCH_API_SECRET="anyfetch-app-secret"

# Number of files to upload at the same time
export DROPBOX_MAX_CONCURRENCY="5"

# See below for details
export DROPBOX_TEST_OAUTH_TOKEN_SECRET=""
export DROPBOX_TEST_OAUTH_TOKEN=""
export DROPBOX_TEST_UID=""
# Leave empty for first run
export DROPBOX_TEST_CURSOR=""
```

# How does it work?
## Init
AnyFetch API will call `/init/connect` with anyfetch authorization code. We will generate a request_token and transparently redirect the user to Dropbox consentment page.
Dropbox will then call us back on `/init/callback`. We'll check our request_token has been granted approval, and store this.

We can now sync data between Dropbox and AnyFetch.

## Update
This is where the `upload` helper comes into play.
Every time `upload` is called, the function will retrieve the files modified since the last run, and upload them to AnyFetch.
Deleted files will also be deleted from AnyFetch.

The computation of the delta (between last run and now) is done by Dropbox, and can be really long in some rare cases (for most accounts it is a few seconds, on mine it lasts for 25 minutes -- heavy Dropbox users beware! And that says nothing about the time to retrieve the data after.)

# How to test?
Unfortunately, testing this module is really hard.
This project is basically a simple bridge between Dropbox and AnyFetch, so testing requires tiptoeing with the network and Dropbox / AnyFetch servers.

Before running the test suite, you'll need to do:

```
> node test-auth.js
```

Follow the link in your browser with your Dropbox.
After that, press enter and copy the result in your shell, then. Save the values as DROPBOX_TEST_* environment variable.

> *Advanced users*: keep `DROPBOX_TEST_CURSOR` empty by default. If you want to make the tests run faster, `console.log` the return of a call to `helpers.retrieve.delta()` and paste the `cursor` value.

Support: `support@anyfetch.com`.
