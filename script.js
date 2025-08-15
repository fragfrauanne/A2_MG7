const tasks = [
    { question: "Kannst du ihr (bitte) den Weg erklären?", answer: "Ich habe ihn ihr schon erklärt." },
    { question: "Kannst du ihm (bitte) das Geld geben?", answer: "Ich habe es ihm schon gegeben." },
    { question: "Kannst du ihnen (bitte) deine Adresse geben?", answer: "Ich habe sie ihnen schon gegeben." },
    { question: "Kannst du ihm (bitte) einen Löffel bringen?", answer: "Ich habe ihn ihm schon gebracht." },
    { question: "Kannst du ihm (bitte) Hochzeitsfotos zeigen?", answer: "Ich habe sie ihm schon gezeigt." },
    { question: "Kannst du ihr (bitte) das Wasser geben?", answer: "Ich habe es ihr schon gegeben." },
    { question: "Kannst du ihnen (bitte) das Buch schenken?", answer: "Ich habe es ihnen schon geschenkt." },
    { question: "Kannst du ihr (bitte) Blumen mitbringen?", answer: "Ich habe sie ihr schon mitgebracht." },
    { question: "Kannst du ihm (bitte) die Übung erklären?", answer: "Ich habe sie ihm schon erklärt." },
    { question: "Kannst du ihm (bitte) die E-Mail schicken?", answer: "Ich habe sie ihm schon geschickt." },
    { question: "Kannst du ihr (bitte) deine Telefonnummer sagen?", answer: "Ich habe sie ihr schon gesagt." },
    { question: "Kannst du ihm (bitte) dein Fahrrad leihen?", answer: "Ich habe es ihm schon geliehen." },
    { question: "Kannst du ihm (bitte) eine Nachricht schreiben?", answer: "Ich habe sie ihm schon geschrieben." },
    { question: "Kannst du ihr (bitte) einen Kaffee bringen?", answer: "Ich habe ihn ihr schon gebracht." },
    { question: "Kannst du ihnen (bitte) das Problem erklären?", answer: "Ich habe es ihnen schon erklärt." },
    { question: "Kannst du ihnen (bitte) eine Nachricht schicken?", answer: "Ich habe sie ihnen schon geschickt." },
    { question: "Kannst du ihr (bitte) ein Eis kaufen?", answer: "Ich habe es ihr schon gekauft." },
    { question: "Kannst du ihr (bitte) einen Regenschirm geben?", answer: "Ich habe ihn ihr schon gegeben." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
