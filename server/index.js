const express = require('express');
const { getReposByUsername } = require('../helpers/github.js')
const { save, getRepos } = require('../database')
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('./client/dist')); // keep an eye on this path during deployment
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.username)
    .then((response) => {
      const githubData = response.data.map((element, index, array) => {
        return {
          repoId: element.id,
          repoName: element.full_name,
          userId: element.owner.id,
          userName: element.owner.login,
          repoURL: element.html_url,
          description: element.description,
          forks: element.forks_count,
          stars: element.stargazers_count,
          watchers: element.watchers_count
        }
      });
      save(githubData);
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      res.sendStatus(400);
      console.log('app.post error: ', err);
    });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getRepos((err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

