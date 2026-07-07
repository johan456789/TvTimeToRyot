# TvTime to Ryot

## Information

TV time is shutting down. So I want to migrate to something open source to avoid having to deal with this again in the future.

[Ryot](https://github.com/IgnisDa/ryot) seems to be pretty good.

This script automates the import of TV time data to Ryot. Ryot supports both TVDB and TMDB. This scripts uses TVDB too for compatibility with TV Time.

ONLY some data is imported:

- TV shows episode watches (including watch dates)
- TV shows not yet started (these are saved to watchlists in Ryot)

All other data like movies, comments, reviews are not imported. You can fork this and add the support you need.

> Run this script and import the data on you own risk, I recommend try it first on an empty instance of Ryot to avoid data loses, or at least make some backups if you have some previous data.

## Requirements

- You need an export from TvTime.
- You need an instance of [Ryot](https://github.com/IgnisDa/ryot)

### Get your Data from TV Time

Get your data at <https://gdpr.tvtime.com/gdpr/self-service> before July 15, 2026.

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
