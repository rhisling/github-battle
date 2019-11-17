import React, { useState, useEffect } from 'react';
import LanguagesNav from '../components/LanguagesNav';
import ReposGrid from '../components/ReposGrid';

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState({});
  const [error] = useState(null);

  useEffect(() => {
    console.log('in Use effect');
    console.log(JSON.stringify(repos));
    async function fetchPopularRepos(selectedLanguage) {
      const endpoint = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${selectedLanguage}&sort=stars&order=desc&type=Repositories`
      );

      let resp = await fetch(endpoint);
      let data = await resp.json();
      setRepos({ ...repos, [selectedLanguage]: data.items });
    }
    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage);
    }
  }, [repos, selectedLanguage]);

  const isLoading = () => {
    return !repos[selectedLanguage] === null && error === null;
  };

  return (
    <>
      <LanguagesNav
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      {error && <p>error</p>}
      {isLoading() && <p>LOADING</p>}
      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </>
  );
};

export default Popular;
