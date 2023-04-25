import React from 'react';

const RepoListEntry = ({ repo }) => (
  <tr>
    <td className="repo-list-entry" data-list-entry="repo-name" > <a href={repo.repoURL}>{repo.repoName}</a></td>
    <td className="repo-list-entry" data-list-entry="user-name"> {repo.userName} </td>
    <td className="repo-list-entry" data-list-entry="description"> {repo.description} </td>
    <td className="repo-list-entry" data-list-entry="forks"> {repo.forks} </td>
    <td className="repo-list-entry" data-list-entry="stars"> {repo.stars} </td>
    <td className="repo-list-entry" data-list-entry="watchers"> {repo.watchers} </td>
  </tr>
);

export default RepoListEntry;