const twit = require('twit');

const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}

const Twitter = new twit(config);

let retweet = function() {
  let params = {
    q: 'katespade OR anthonybourdain OR depression',
    result_type: 'mixed',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err,data) {
    if (!err) {
      for (let i = 0; i < 4; i++) {
        let rtId = data.statuses[i].id_str;
        Twitter.post('statuses/retweet/:id', {
          id: rtId
          }, function(err,response) {
          if (response) {
            console.log('Successfully retweeted');
          }
          if (err) {
            console.log(err);
          }
        });
        }
      }
      else {
      console.log('Could not search tweets');
    }
  });
}
// retweet();
// setInterval(retweet, 28800000);