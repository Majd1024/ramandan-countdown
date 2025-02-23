let lastValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        
function createDigit(value, animate = false) {
    const digit = document.createElement("div");
    digit.classList.add("digit");
    if (animate) digit.classList.add("flip");
    digit.innerText = value;
    return digit;
}

function updateCountdown() {
    const now = new Date();
    const eventDate = new Date("2025-02-28T00:00:00");
    const diff = eventDate - now;
    
    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "<div style='font-size: 50px; color: white; text-align: center;'>Ramadan has begun!<br>Ramadan Mubarak</div>";
        return;
    }
    
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    function updateBlock(id, value) {
        const block = document.getElementById(id);
        const digits = value.toString().padStart(2, "0").split("");
        const lastDigits = lastValues[id].toString().padStart(2, "0").split("");
        
        block.innerHTML = "";
        digits.forEach((num, i) => {
            const animate = lastValues[id] !== -1 && lastDigits[i] !== num;
            block.appendChild(createDigit(num, animate));
        });
        lastValues[id] = value;
    }
    
    updateBlock("days", days);
    updateBlock("hours", hours);
    updateBlock("minutes", minutes);
    updateBlock("seconds", seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();
