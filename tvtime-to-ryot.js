const fs = require("fs");
const {parse} = require("csv-parse");

async function getWatchHistoryFromTrackingCSV() {
    const rows = await new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream("./tracking-prod-records-v2.csv")
            .pipe(parse({columns: true}))
            .on("data", function (row) {
                const key = row.key || "";
                if (key.startsWith("watch-episode-") || key.startsWith("rewatch-episode-")) {
                    data.push({
                        tvdb_id: row.s_id,
                        series_name: row.series_name,
                        season_number: row.season_number,
                        episode_number: row.episode_number,
                        created_at: new Date(row.created_at),
                        is_rewatch: key.startsWith("rewatch-episode-")
                    });
                }
            }).on('end', () => resolve(data))
    });

    return await rows;
}

function groupByShow(watchHistory) {
    const shows = {};
    for (const watch of watchHistory) {
        if (!shows[watch.tvdb_id]) {
            shows[watch.tvdb_id] = {
                id: watch.tvdb_id,
                name: watch.series_name,
                episodes: []
            };
        }
        shows[watch.tvdb_id].episodes.push({
            season_number: parseInt(watch.season_number),
            episode_number: parseInt(watch.episode_number),
            created_at: watch.created_at,
            is_rewatch: watch.is_rewatch
        });
    }
    return Object.values(shows);
}

function generateSeenHistory(episodes) {
    episodes.sort((a, b) => a.created_at - b.created_at);
    
    return episodes.map(ep => ({
        progress: "100",
        show_episode_number: ep.episode_number,
        show_season_number: ep.season_number,
        ended_on: ep.created_at,
        started_on: null,
        state: "completed"
    }));
}

function convertToRyotJson(shows) {
    const result = [];
    for (const s of shows) {
        const seen_history = generateSeenHistory(s.episodes);
        if (seen_history.length > 0) {
            result.push({
                collections: [],
                identifier: s.id,
                lot: "show",
                reviews: [],
                seen_history: seen_history,
                source: "tvdb",
                source_id: s.id
            });
        }
    }
    return result;
}

async function run() {
    const watchHistory = await getWatchHistoryFromTrackingCSV();
    const shows = groupByShow(watchHistory);
    const metadata = convertToRyotJson(shows);

    fs.writeFileSync("./tvshows-ryot.json", JSON.stringify({
        metadata: metadata,
        collections: null,
        exercises: null,
        measurements: null,
        metadata_groups: null,
        people: null,
        workout_templates: null,
        workouts: null
    }));
}

run();
