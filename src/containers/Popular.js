import React, { useState, useEffect } from 'react';
import LanguagesNav from '../components/LanguagesNav';
import ReposGrid from '../components/ReposGrid';
import Loading from '../components/Loading';

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState({});
  const [error] = useState(null);

  useEffect(() => {
    async function fetchPopularRepos(selectedLanguage) {
      const endpoint = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${selectedLanguage}&sort=stars&order=desc&type=Repositories`,
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
    return !repos[selectedLanguage] && error === null;
  };

  return (
    <>
      <LanguagesNav
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      {error && <p>error</p>}
      {isLoading() && <Loading text="Fetching Repos" speed={300} />}
      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </>
  );
};

export default Popular;
