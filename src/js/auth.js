import { fetchData } from './fetch.js';

// kirjautumisen käsittely

const loginUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const loginForm = document.querySelector('.loginForm');

  // Haetaan formista arvot
  const username = loginForm.querySelector('input[name=username]').value;
  const password = loginForm.querySelector('input[name=password]').value;

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/auth/login';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error logging in:', response.error);
    alert('Kirjautuminen epäonnistui: ' + response.error);
    return;
  }

  if (response.token) {
    console.log('Kirjautuminen onnistui!', 'success');
    // Tallennetaan token ja käyttäjänimi localStorageen
    localStorage.setItem('token', response.token);
    localStorage.setItem('nimi', response.user.username);

    // Ohjataan etusivulle
    window.location.href = 'etusivu.html';
  }

  loginForm.reset(); // Tyhjennetään formi
};

// Lomakkeen lähetyksen kuuntelija
const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);