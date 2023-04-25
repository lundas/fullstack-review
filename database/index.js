const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: { type: Number, unique: true },
  repoName: String,
  userId: Number,
  userName: String,
  repoURL: String,
  description: String,
  forks: Number,
  stars: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach((element, index, array) => {
    let repo = new Repo(element);
    repo.save(function (err, repo) {
      if (err) {
        console.log(`Error saving ${repo.repoName}:`, err);
      } else {
        console.log(`Successfully saved ${repo.repoName}`);
      }
    })
  })
}

module.exports.save = save;