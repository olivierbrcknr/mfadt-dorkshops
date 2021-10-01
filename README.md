# The website to see the current dorkshops

## Setup

This website fetches a list from [Google Sheets](https://www.google.com/sheets/about/) and displays it. For it to work you need to provide an `.env` file. It should look like this:

```sh
# Google Sheet
GOOGLE_SHEETS_ID="<Your Google Sheet ID>"
GOOGLE_SHEET_ID="<Your Google Sheet (table) ID>"
GOOGLE_SERVICE_ACCOUNT_EMAIL="<Your Google Service Account Email>"
GOOGLE_PRIVATE_KEY="<Your Google Private Key>"

# FTP Server
FTP_USER="<Your FTP user>"
FTP_PW="<Your FTP password>"
FTP_SERVER="<Your FTP server URL>"
FTP_PORT="<Your FTP port>"
FTP_DIRECTORY="<Your FTP directory>"
```

The table itself needs these columns: `Title`, `Description`, `Date` (in date format), `Time` (in time format), `Duration` (in duration format), `Place`, `Person`, and `Email`. For validation it also need the columns `IsHappening` and `IsReady`.

## Development

### Installation

This repository is set up using [yarn](https://yarnpkg.com) and [next.js](https://nextjs.org). First locate your folder and then run this script in your terminal to install all dependencies.

```sh
yarn install
```

### Test

To test and develop the website, run this script:

```sh
yarn dev
```

It will open a local server on `localhost:3000`. A subdirectory is defined [here](https://github.com/olivierbrcknr/mfadt-dorkshops/blob/main/next.config.js#L5). This will be the same subdirectory as on the server, hence you need to enter it on your testing server as well.

In this case, the website will run on [localhost:3000/dorkshops/](http://localhost:3000/dorkshops/).

### Deploy

To deploy your website, run this command:

```sh
yarn deploy
```

It will first export your website into a static format in an "out" folder and then upload this folder to your specified ftp server. **Currently it is set to `sftp`.** You can find the relevant script [here](https://github.com/olivierbrcknr/mfadt-dorkshops/blob/main/deploy.js).

If you intend to only export your website and not deploy it, simply run this script:

```sh
yarn export
```
