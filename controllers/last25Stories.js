var newStoriesURL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
var services = require("../services");

module.exports = (req, res) => {
  // get index of last 25 stories
  services
    .fetchStories(newStoriesURL)
    .then(stories => {
      // get first 25
      stories = stories.slice(0, 25);
      // accummulate titles asynchronously and in parallel
      Promise.all(stories.map(story => services.fetchTitle(story)))
        .then(titles => {
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
      res.status(400).send("An error occurred while fetching the stories");
    });
};
