var axios = require("axios");
var services = require("../services");
var topStoriesURL =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
var bestStoriesURL =
  "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
var newStoriesURL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";

var getValidStories = stories =>
  new Promise((resolve, reject) => {
    var counter = 0;
    var karmaStories = [];
    // get users from each story
    stories.map(s => {
      services
        .fetchItem(s)
        .then(story => {
          if (story && story.by) {
            services
              .fetchUser(story.by)
              .then(user => {
                // check if user has 10000 karma
                if (user.karma > 10000) {
                  // add this user's stories
                  karmaStories = karmaStories.concat(user.submitted);
                  counter += user.submitted.length;
                }
                // limit to 600 stories of all users
                if (counter > 600) resolve(karmaStories);
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  });

module.exports = (req, res) => {
  // get top stories
  services
    .fetchStories(bestStoriesURL)
    .then(stories => {
      getValidStories(stories)
        .then(s => {
          // Not sure this is the expected behavior. Making an assumption that we only care about the last 600 entires in totallity
          // limit to 600 stories of all users
          s = s.slice(0, 600);
          // accummulate titles asynchronously and in parallel
          Promise.all(s.map(story => services.fetchTitle(story)))
            .then(titles => {
              // run titles through parser for top 10 most occuring words
              var parsed = services.top10(titles);
              res.send(parsed);
            })
            .catch(err => {
              // console.log(err);
              res
                .status(400)
                .send("An error occured while fetching the titles");
            });
        })
        .catch(err => {
          console.log(err);
          res.status(400).send("An error occured while filtering the stories");
        });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("An error occured while fetching the titles");
    });
};
