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

let getRepos = (callback) => {
  const query = Repo.find();
  query.sort({forks: 'desc'});
  query.limit(25).exec((err, result) => {
    if (err) {
      console.log('Error executing MongoDB Query:', err)
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

module.exports.save = save;
module.exports.getRepos = getRepos;