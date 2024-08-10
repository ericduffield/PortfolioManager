function AddTransitions() {
    document.querySelectorAll(".box").forEach(element => element.style.transition = "all 300ms ease");
}

function RemoveTransitions() {
    document.querySelectorAll(".box").forEach(element => element.style.transition = "none");
}

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const darkMode = document.querySelector("#dark-mode");
const modeLogo = document.querySelector("#mode-logo");
const modeText = document.querySelector("#mode-text");

menuBtn.addEventListener("click", () => {
    sideMenu.style.left = "0%";
})

closeBtn.addEventListener("click", () => {
    sideMenu.style.left = "-100%";
})

darkMode.addEventListener("click", () => {
    toggleMode();
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const percentageFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const shortFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function toggleMode() {
    RemoveTransitions();
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 24 * 60 * 60;
    now.setTime(expireTime);
    document.body.classList.toggle("light-mode-variables");
    if (modeLogo.innerHTML == "light_mode") {
        modeLogo.innerHTML = "mode_night";
        modeText.innerHTML = "Dark Mode";
        document.cookie = "isDark=true; expires=" + now.toUTCString() + "path=/;";
    }
    else {
        modeLogo.innerHTML = "light_mode";
        modeText.innerHTML = "Light Mode";
        document.cookie = "isDark=false; expires=" + now.toUTCString() + "path=/;";
    }

    document.cookie =
        sleep(300).then(() => {
            AddTransitions();
        });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie("isDark") == "true") {
    toggleMode();
}

window.onload = function () {
    AddTransitions();
}

export { dollarFormatter, percentageFormatter, shortFormatter };