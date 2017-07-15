const reddit = require('concierge/reddit');
let results = [];

const insult = async(api, thread) => {
    // If we have no stored insults, get some
    if (!results || results.length === 0) {
        results = await reddit('insults', 200);
    }

    // Get some random insult
    const random = api.random(results),
        title = random.data.title,
        text = random.data.selftext;

    // Delete the insult, so we don't get it again
    results.splice(results.indexOf(random), 1);
    api.sendMessage(`${title}\n${text}`, thread);
};

exports.run = (api, event) => {
    insult(api, event.thread_id);
};
