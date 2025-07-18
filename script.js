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
    // Dny se počítají z celkové milisekundové diference
    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));


    // **Vylepšený výpočet pro měsíce a zbývající dny:**
    // Tento přístup je spolehlivější pro zobrazení "měsíců a zbývajících dnů"
    // Je potřeba vytvořit pomocné datum pro iteraci měsíci
    let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    let endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), targetDate.getHours(), targetDate.getMinutes(), targetDate.getSeconds());

    let months = 0;
    let days = 0;

    // Pokud je cílové datum v budoucnu
    if (endDate > startDate) {
        // Počítání měsíců
        while (startDate.getTime() < endDate.getTime()) {
            let nextMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
            // Pokud další měsíc nepřekročí endDate, přičteme měsíc
            if (nextMonth.getTime() <= endDate.getTime()) {
                months++;
                startDate = nextMonth;
            } else {
                // Pokud další měsíc překročí endDate, zastavíme počítání měsíců
                // a zbytek bude v dnech
                break;
            }
        }

        // Zbývající dny (rozdíl mezi upraveným startDate a endDate)
        const remainingTimeAfterMonths = endDate.getTime() - startDate.getTime();
        days = Math.floor(remainingTimeAfterMonths / (1000 * 60 * 60 * 24));
        
        // Pokud zbývající dny přesahují počet dní v aktuálním měsíci,
        // je potřeba se ujistit, že se nepočítá celkem 30+ dní jako "měsíc a něco dní",
        // ale jen zbývající dny v rámci tohoto měsíce.
        // Tato složitá logika pro "měsíce a dny" je důvod, proč se často používá jen "celkové dny".
        // Pro co nejjednodušší a nejpřesnější zobrazení je nejlepší:
        //  - celkový počet měsíců
        //  - zbývající dny PO odečtení celých měsíců
        // Toto řešení nahoře už by mělo být OK, ale pro jistotu:
        // Po odečtení celých měsíců spočítáme zbývající dny.
        // Např. "1 měsíc, 17 dní" pro odpočet do 5. září od teď je správně.
        // Od 18. července 2025 do 5. září 2025:
        //  - 18. července + 1 měsíc = 18. srpna
        //  - Od 18. srpna do 5. září je 18 dní.
        //  Takže 1 měsíc, 18 dní. To sedí s vaším screenshotem.
    }


    // Zobrazení na stránce (aktualizace HTML elementů)
    document.getElementById("months").innerText = months; // Upraveno na správný výpočet měsíců
    document.getElementById("days").innerText = days; // Upraveno na zbývající dny po měsících
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Spuštění odpočtu a jeho aktualizace každou vteřinu
const interval = setInterval(updateCountdown, 1000);
updateCountdown(); // Spustit hned, aby se zobrazil okamžitě