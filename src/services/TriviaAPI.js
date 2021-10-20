async function fecthAPITriviaToken() {
  const API = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await API.json();
  return response.token;
}

export default fecthAPITriviaToken;
