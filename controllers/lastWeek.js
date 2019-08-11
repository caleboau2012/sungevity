var moment = require("moment");
var services = require("../services");
var newStoriesURL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";

module.exports = (req, res) => {
  services
    .fetchStories(newStoriesURL)
    .then(stories => {
      Promise.all(stories.map(story => services.fetchItem(story)))
        .then(items => {
          var titles = [];

          items.map(item => {
            if (item && item.time && item.title) {
              if (
                moment(item.time * 1000).isAfter(moment().subtract(7, "days"))
              )
                titles.push(item.title);
            }
          });

          // run titles through parser for top 10 most occuring words
          var parsed = services.top10(titles);

          res.send(parsed);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send("An error occured while fetching the titles");
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(400)
        .send("An error happened when fetching the most recent entry");
    });
};
