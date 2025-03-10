import { fetchData } from './fetch.js';

const getEntries = async () => {

    const diaryContainer = document.getElementById('diary');

    // Haetaan token localStoragesta
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Ei löytynyt autentikointitokenia');
        return;
    }

    try {
        // Haetaan data API:sta
        const response = await fetchData('http://localhost:3000/api/entries', {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Jos on virhe, palautetaan
        if (response.error) {
            console.error('Virhe haussa:', response.error);
            return;
        }

        console.log('Haettu data:', response);

        // Tyhjennetään vanhat kortit ja luodaan uudet
        diaryContainer.innerHTML = '';

        response.forEach((entry) => {

            const date = new Date(entry.entry_date);
            let newdate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

            const card = document.createElement('div');
            card.classList.add('card');

            const cardImg = document.createElement('div');
            cardImg.classList.add('card-img');

            const img = document.createElement('img');
            img.src = 'src/img/health.png';
            img.alt = 'Diary Image';
            cardImg.appendChild(img);

            const cardDiary = document.createElement('div');
            cardDiary.classList.add('card-diary');
            cardDiary.innerHTML = `
                <p><strong>Date:</strong> ${newdate}</p>
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p><strong>Weight:</strong> ${entry.weight} kg</p>
                <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
                <p><strong>Notes:</strong> ${entry.notes}</p>
            `;

            card.appendChild(cardImg);
            card.appendChild(cardDiary);
            diaryContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Virhe päiväkirjamerkintöjen haussa:', error.message);
    }
};

// Suoritetaan getEntries-funktio, kun sivu on ladattu
window.onload = getEntries;
