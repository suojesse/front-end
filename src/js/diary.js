import { fetchData } from "./fetch.js";

const url = "/diary.json";
const cardArea = document.querySelector(".card-area2");
const fetchButton = document.querySelector(".get_entries");

fetchButton.addEventListener("click", async () => {
    const entries = await fetchData(url);
    generateCards(entries);
});

function generateCards(entries) {
    cardArea.innerHTML = ""; 

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("card-img");
        const img = document.createElement("img");
        img.src = "/img/diary.jpg";
        img.alt = "Diary Image";
        imgDiv.appendChild(img);

        const diaryDiv = document.createElement("div");
        diaryDiv.classList.add("card-diary");
        diaryDiv.innerHTML = `
            <strong>Päivämäärä:</strong> ${entry.entry_date}<br>
            <strong>Mieliala:</strong> ${entry.mood}<br>
            <strong>Paino:</strong> ${entry.weight} kg<br>
            <strong>Uni:</strong> ${entry.sleep_hours} h<br>
            <strong>Muistiinpanot:</strong> ${entry.notes}
        `;

        card.appendChild(imgDiv);
        card.appendChild(diaryDiv);
        cardArea.appendChild(card);
    });
}