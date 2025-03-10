import { fetchData } from './fetch.js';

const registerUser = async (event) => {
    event.preventDefault();

    const registerForm = document.querySelector('.registerForm'); // Haetaan rekisteröintilomake
    const username = registerForm.querySelector('#username').value.trim(); // Haetaan ja siistitään käyttäjänimi
    const password = registerForm.querySelector('#password').value.trim(); // Haetaan ja siistitään salasana
    const email = registerForm.querySelector('#email').value.trim(); // Haetaan ja siistitään sähköposti

    const bodyData = { username, password, email }; 
    const url = 'http://localhost:3000/api/users'; // Määritetään API:n URL-osoite
    const options = {
        body: JSON.stringify(bodyData), // Muutetaan olio JSON-muotoon
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetchData(url, options); // Lähetetään pyyntö fetchData-funktion avulla

        if (response.error) {
            console.error('Error adding a new user:', response.error);
            return;
        }

        if (response.message) {
            console.log(response.message, 'success');
        }

        // Uudelleenohjataan käyttäjä takaisin kirjautumissivulle
        window.location.href = 'index.html';
        registerForm.reset(); 
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

document.querySelector('.registerForm').addEventListener('submit', registerUser);