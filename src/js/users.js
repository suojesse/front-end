import {fetchData} from './fetch';

const getUsers = async () => {
  const url = 'http://localhost:3000/api/users';
  const users = await fetchData(url);

  if (users.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(users);

  const tableBody = document.querySelector('.tbody');
  tableBody.innerHTML = ''; //tyhjennetään taulukko

  // TODO, myöhemmin järkevä erotella omaksi funktiokseen
  users.forEach((user) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><button class="check" data-id="${user.user_id}">Info</button></td>
        <td><button class="del" data-id="${user.user_id}">Delete</button></td>
        <td>${user.user_id}</td>
      `;

    tableBody.appendChild(row);
  });

  addEventListeners();
};

const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');
// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

const addEventListeners = () => {
  const nappulat = document.querySelectorAll('.check');
  console.log(nappulat);
  nappulat.forEach((button) => {
    button.addEventListener('click', async (event) => {
      console.log('Klikkasit nappulaa:', event.target);
      // get id with data-attribute
      // or use a hidden input field in table
      const userId = event.target.dataset.id;
      console.log('Haetaan tietoja käyttäjälle id:llä:', userId);

      // Fetch user details
      const user = await getUserById(userId);
      console.log(user);

      if (user) {
        // open modal
        dialog.querySelector('p').innerHTML = '';
        dialog.showModal();
        dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${user.user_id}</span></div>
          <div>User Name: <span>${user.username}</span></div>
          <div>Email: <span>${user.email}</span></div>
          <div>Role: <span>${user.user_level}</span></div>`;
      }
    });
  });
};

const getUserById = async (userId) => {
  const user = await fetchData(`http://localhost:3000/api/users/${userId}`);

  if (user.error) {
    console.error(`Error fetching item with ID ${userId}:`, user.error);
    alert(`Error: ${user.error}`);
    return null;
  }

  return user;
};

// Get the snackbar DIV
const snackbar = document.getElementById('snackbar');

// Reusable function to show snackbar message
const showSnackbar = (message, type = '') => {
  snackbar.innerText = message;
  snackbar.className = `show ${type}`.trim(); // Add optional type class (e.g., 'error')

  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '').trim();
  }, 3000);
};

const addUser = async (event) => {
  event.preventDefault();
  // POST
  //content-type: application/json

  // Haetaan formista oikea tieto mikä on täytetty .value
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const email = document.querySelector('#email').value.trim();

  // const bodyData = {
  //   username: 'Uusi käyttäjä',
  //   password: 'salakala',
  //   email: 'newuser@example.com',
  // };

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // url
  const url = 'http://localhost:3000/api/users';

  // options eli mikä metodi, headers ja JSON
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    //alert('Sinun täytyy muistaa täyttää kaikki kentät!!');
    // On hyvä jättää oikea virhe ns. koodareille luettavaksi
    console.log(response.error);
    // Käyttäjän viesti!!
    showSnackbar(
      'Virhe lähettämisessä, täytä kaikki vaadittavat kentät!',
      'error',
    );
    return;
  }

  if (response.message) {
    //alert(response.message);
    console.log(response.message);
    showSnackbar('Onnistunut käyttäjän lisääminen :) 💕', 'success');
  }

  console.log(response);
  document.querySelector('.addform').reset(); // tyhjennetään formi
  getUsers();
};

// TODOO
// Tee tänne funktio joka hakee yksittäiset käyttäjän tiedot
// KÄytä tähän reittiä
// GET http://localhost:3000/api/users/:id

export {getUsers, addUser};
