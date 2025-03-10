import { fetchData } from './fetch.js';


const addDiaryEntry = async (event) => {
    event.preventDefault();

    const form = document.querySelector('#diary-form'); // Valitaan lomake
    const entry_date = form.querySelector('#entry_date').value; // Haetaan merkinnän päivämäärä
    const mood = form.querySelector('#mood').value.trim(); // Haetaan ja trimmataan mieliala
    const weight = form.querySelector('#weight').value.trim(); // Haetaan ja trimmataan paino
    const sleep_hours = form.querySelector('#sleep_hours').value.trim(); // Haetaan ja trimmataan unetunnit
    const notes = form.querySelector('#notes').value.trim(); // Haetaan ja trimmataan muistiinpanot

    // Haetaan token localStoragesta
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No authentication token found'); // Tulostetaan virhe, jos tokenia ei löydy
        return;
    }

    // Rakennetaan lähetettävä data
    const bodyData = { entry_date, mood, weight, sleep_hours, notes };
    const url = 'http://localhost:3000/api/entries'; // API:n URL
    const options = {
        body: JSON.stringify(bodyData), // Muutetaan data JSON-muotoon
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Määritellään sisällön tyyppi
            Authorization: `Bearer ${token}`, 
        },
    };

    try {
        const response = await fetchData(url, options); // Lähetetään pyyntö API:lle

        if (response.error) {
            console.error('Error adding diary entry:', response.error); 
            return;
        }

        console.log('Diary entry added successfully:', response);
        form.reset();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};


document.querySelector('#diary-form').addEventListener('submit', addDiaryEntry);