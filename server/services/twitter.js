const dotenv = require('dotenv');
dotenv.config({ path: '/Users/aviads/IdeaProjects/cryptofolio/config.env' });

const OAuth = require('oauth');

let oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
);

let status = 'Test, Posted using API';  // This is the tweet (ie status)

let postBody = {
    'status': status
};

// console.log('Ready to Tweet article:\n\t', postBody.status);
oauth.post('https://api.twitter.com/1.1/statuses/update.json',
    process.env.TWITTER_USER_ACCESS_TOKEN,  // oauth_token (user access token)
    process.env.TWITTER_USER_SECRET,  // oauth_secret (user secret)
    postBody,  // post body
    '',  // post content type ?
    function(err, data, res) {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
        }
    });