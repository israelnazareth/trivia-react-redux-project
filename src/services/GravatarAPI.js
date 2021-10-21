import md5 from 'crypto-js/md5';

async function fetchGravatarAPI(emailDoUsuário) {
  const email = md5(emailDoUsuário).toString();
  const API = await fetch(`https://www.gravatar.com/avatar/${email}`);
  const response = API.url;
  return response;
}

export default fetchGravatarAPI;
