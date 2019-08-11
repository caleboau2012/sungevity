var axios = require("axios");

var fetchStories = URL =>
  new Promise((resolve, reject) => {
    // fetch new stories
    axios
      .get(URL)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => reject(err));
  });

var fetchUser = (user, index) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/user/${user}.json?print=pretty`
      )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

var fetchItem = (id, index) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(response => {
        if (response && response.data) resolve(response.data);
        else {
          resolve(null);
        }
      })
      .catch(error => {
        // console.log(error);
        resolve(null);
      });
  });

var fetchTitle = (story, index) =>
  new Promise((resolve, reject) => {
    fetchItem(story)
      .then(item => {
        if (item && item.title) resolve(item.title);
        else resolve("");
      })
      .catch(err => {
        // console.log(err);
        resolve("");
      });
  });

var top10 = titles => {
  var wordMap = {};

  // accumulate words and counts.
  titles.map((title, i) => {
    if (title) {
      var words = title.split(/\W+/);

      for (var i = 0; i < words.length; i++)
        wordMap[words[i].toLowerCase()] =
          (wordMap[words[i].toLowerCase()] || 0) + 1;
    }
  });

  var wordCount = [];

  for (word in wordMap) {
    wordCount.push({
      word: word,
      count: wordMap[word]
    });
  }

  wordCount.sort((w1, w2) => w2.count - w1.count);

  return wordCount.slice(0, 10);
};

module.exports = {
  fetchStories,
  fetchUser,
  fetchItem,
  fetchTitle,
  top10
};
