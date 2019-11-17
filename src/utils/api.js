export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}

const getErrorMsg = (message, username) => {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }
  return message;
};

export const getProfile = async username => {
  let resp = await fetch(`https://api.github.com/users/${username}`);
  let profile = await resp.json();
  if (profile.message) {
    throw new Error(getErrorMsg(profile.message, username));
  }
  console.log('prfile', profile);
  return profile;
};

export const getRepos = async username => {
  let resp = await fetch(`https://api.github.com/users/${username}/repos`);
  let repos = await resp.json();
  if (repos.message) {
    throw new Error(getErrorMsg(repos.message, username));
  }
  console.log('repos', repos);
  return repos;
};

async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);
  return {
    profile,
    score: calculateScore(profile.followers, repos)
  };
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getStarCount(repos) {
  console.log('in star count:', repos);
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

export async function battle(players) {
  const results = await Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]);
  console.log('results:' + JSON.stringify(results));
  return sortPlayers(results);
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
