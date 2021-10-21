async function fecthAPITriviaToken() {
  const API = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await API.json();
  return response.token;
}

async function fetchTriviaQuestions() {
  const localToken = localStorage.getItem('token');
  const API = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
  const response = await API.json();
  return response.results;
}

export { fecthAPITriviaToken, fetchTriviaQuestions }; 