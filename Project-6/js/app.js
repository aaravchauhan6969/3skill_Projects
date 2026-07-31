// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


// ==========================
// SEARCH BUTTON (HOME PAGE)
// ==========================

const searchBox = document.querySelector(".search-box");

if (searchBox) {

    const searchInput = searchBox.querySelector("input");
    const searchBtn = searchBox.querySelector("button");

    if (searchInput && searchBtn) {

        searchBtn.addEventListener("click", () => {

            const city = searchInput.value.trim();

            if (city === "") {

                alert("Please enter a city name.");
                return;

            }

            alert(`Searching properties in ${city}...`);

        });

        searchInput.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {

                searchBtn.click();

            }

        });

    }

}


// ==========================
// NAVBAR SCROLL EFFECT
// ==========================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background = "rgba(255,255,255,0.98)";
            navbar.style.boxShadow = "0 15px 35px rgba(0,0,0,.15)";

        } else {

            navbar.style.background = "rgba(255,255,255,.85)";
            navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

        }

    });

}


// ==========================
// PROPERTY CARD BUTTONS (HOME PAGE)
// ==========================

const propertyButtons = document.querySelectorAll(".card button");

if (propertyButtons.length > 0) {

    propertyButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.parentElement;

            const title = card.querySelector("h3")?.textContent || "";
            const location = card.querySelector("p")?.textContent || "";
            const price = card.querySelector("h4")?.textContent || "";

            alert(`Property Details

🏠 ${title}

📍 ${location}

💰 ${price}

(More details will be added in future updates)`);

        });

    });

}


// ==========================
// FOOTER YEAR
// ==========================

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML = `© ${new Date().getFullYear()} EstateHub. All Rights Reserved.`;

}


// ==========================
// DARK MODE
// ==========================

const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";

        }

    });

}


// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("loader-hide");

        }, 800);

    }

});