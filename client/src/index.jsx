import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let ignore = false;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      datatype: 'json',
      success: (response) => {
        if (!ignore) {
          setRepos(response);
        }
      },
      error: (err, errString) => {
        console.log('AJAX GET request error:', errString)
      }
    })

    return () => {
      ignore = true;
    };
  }, [repos]);

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      contentType: 'application/json',
      data: JSON.stringify({ username: term }),
      datatype: 'json',
      success: (response) => {
        console.log('Received response status: ', response);
      },
      error: (err, errString) => {
        console.log('AJAX POST request error:', errString);
      }
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));