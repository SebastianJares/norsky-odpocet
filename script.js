// script.js

// Správné cílové datum a čas: 5. září 2025, 6:00:00 ráno CEST (GMT+0200)
const targetDate = new Date("September 5, 2025 06:00:00 GMT+0200"); 

function updateCountdown() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime(); // Rozdíl v milisekundách

    // Pokud je čas u konce
    if (difference < 0) {
        document.getElementById("countdown").innerHTML = "<p class='finished-message'>Čas vypršel! Dobrou cestu do Norska!</p>";
        clearInterval(interval);
        return; // Ukončí funkci, aby se nic dál nepočítalo
    }

    // Výpočty pro dny, hodiny, minuty, vteřiny
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    // Vylepšený výpočet pro měsíce a zbývající dny:
    let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    let endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), targetDate.getHours(), targetDate.getMinutes(), targetDate.getSeconds());

    let months = 0;
    let days = 0;

    if (endDate > startDate) {
        let tempMonths = 0;
        let tempDateForMonths = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        
        while (tempDateForMonths.getTime() < targetDate.getTime()) {
            let prevMonth = new Date(tempDateForMonths);
            tempDateForMonths.setMonth(tempDateForMonths.getMonth() + 1);
            if (tempDateForMonths.getTime() <= targetDate.getTime()) {
                tempMonths++;
            } else {
                tempDateForMonths = prevMonth;
                break;
            }
        }
        months = tempMonths;

        let dateAfterMonths = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        
        const remainingTimeAfterMonths = targetDate.getTime() - dateAfterMonths.getTime();
        if (remainingTimeAfterMonths > 0) {
            days = Math.floor(remainingTimeAfterMonths / (1000 * 60 * 60 * 24));
        } else {
            days = 0;
        }
    }

    // Zobrazení na stránce (aktualizace HTML elementů)
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Spuštění odpočtu a jeho aktualizace každou vteřinu
const interval = setInterval(updateCountdown, 1000);
updateCountdown(); // Spustit hned, aby se zobrazil okamžitě

// **NOVÉ: Přidání posluchačů událostí pro kliknutí**

// Definice odkazů
const links = {
    'months-box': 'https://www.google.com/search?q=lofoty&udm=2',
    'days-box': 'https://www.google.com/search?q=abisko&udm=2',
    'hours-box': 'https://www.google.com/search?q=south+norway&udm=2',
    'minutes-box': 'https://www.google.com/search?q=norway+fishing&udm=2',
    'seconds-box': 'https://www.google.com/search?q=norway+camping&udm=2',
    'signature-text': 'https://www.google.com/search?q=gay+dick&udm=2'
};

// Funkce pro otevření odkazu v nové záložce
function openLinkInNewTab(url) {
    window.open(url, '_blank').focus();
}

// Přidání posluchačů událostí ke čtvercům odpočtu
document.getElementById('months-box').addEventListener('click', () => {
    openLinkInNewTab(links['months-box']);
});

document.getElementById('days-box').addEventListener('click', () => {
    openLinkInNewTab(links['days-box']);
});

document.getElementById('hours-box').addEventListener('click', () => {
    openLinkInNewTab(links['hours-box']);
});

document.getElementById('minutes-box').addEventListener('click', () => {
    openLinkInNewTab(links['minutes-box']);
});

document.getElementById('seconds-box').addEventListener('click', () => {
    openLinkInNewTab(links['seconds-box']);
});

// Přidání posluchače událostí k podpisu "David je prd"
document.getElementById('signature-text').addEventListener('click', () => {
    openLinkInNewTab(links['signature-text']);
});
