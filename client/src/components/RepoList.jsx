import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>User</th>
          <th>Description</th>
          <th>Forks</th>
          <th>Stars</th>
          <th>Watchers</th>
        </tr>
        <>
          { repos.map((repo) => (
            <RepoListEntry key={repo.repoId} repo={repo} />
          ))}
        </>
      </tbody>
    </table>
  </div>
)

export default RepoList;