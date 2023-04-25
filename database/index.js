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
    console.log('*****New Repo: ', repo)
    repo.save()
      .catch((err) => {
        if (err.code === 11000) {
          console.log(`RepoId ${err.keyValue.repoId} already exists in database`);
        } else {
          console.log('MongoDB error on save: ', err);
        }
      })
  })
}

module.exports.save = save;