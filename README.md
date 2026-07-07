# TvTime to Ryot

## Information

This is a personal project, that could be interesting for other people in the same situation as I was.

I discovered [Ryot](https://github.com/IgnisDa/ryot), and wanted to start to use it to track the TV shows I watch.

Until now, I was using [TvTime](https://www.tvtime.com/) to store this information, but as I want to keep 100% control of my data, I chose [Ryot](https://github.com/IgnisDa/ryot).

So this is a small script to automatize the export of my ratings from [TvTime](https://www.tvtime.com/) and generate a JSON with following the Ryot's specification to import them into [Ryot](https://github.com/IgnisDa/ryot).

> Run this script and import the data on you own risk, I recommend try it first on an empty instance of Ryot to avoid data loses, or at least make some backups if you have some previous data.

## Requirements

- You need an export from TvTime.
- You need an instance of [Ryot](https://github.com/IgnisDa/ryot)

### Get your Data from TV Time

TV Time's API is not open. In order to get access to your personal data, you will have to request it from TV Time's support via a GDPR request - or maybe just ask for it, whatever works, it's your data.

Copy the template provided by www.datarequests.org into an email
Send it to support@tvtime.com
Wait a few working days for their team to process your request
Extract the data somewhere safe on your local system

### Work on it!

When you get your TvTime copy with your data, you will need to take two files into account.

You need to copy these files to the same place where you have the `tvtime-to-ryot.js` file:

- `tracking-prod-records-v2.csv` - Contains all your watch history with TVDB IDs
- `followed_tv_show.csv` - Contains your followed shows list

## Run

To run the script, just be sure that you have node installed on your computer, at least Node 18.*

`pnpm install`

`node tvtime-to-ryot.js`

The script will generate `tvshows-ryot.json` with your watched shows and `tvshows-ryot-watchlist.json` with your unwatched followed shows.

## Import to Ryot

Finally, when the process finishes, you should have two files:
- `tvshows-ryot.json` - Contains your watched shows with episode history
- `tvshows-ryot-watchlist.json` - Contains your followed but unwatched shows in Watchlist

Import both files into your Ryot instance.

Navigate in your browser to Ryot, and click on **_Imports and Exports_**, select **_Generic Json as source_**, and **_the file_**, press **_import_** and wait a bit, and everything should be fine.

![The import process on Ryot](images/import_to_ryot.png)
