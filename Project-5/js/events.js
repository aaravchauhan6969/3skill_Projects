// ==========================================
// EVENTHUB EVENTS PAGE
// ==========================================

const eventsContainer = document.getElementById("eventsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const noEvents = document.getElementById("noEvents");

// Show Events
function displayEvents(eventList) {

    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    if (eventList.length === 0) {

        noEvents.classList.add("show");
        eventsContainer.style.display = "none";
        return;
    }

    noEvents.classList.remove("show");
    eventsContainer.style.display = "grid";

    eventList.forEach(event => {

        const price =
            event.price === 0
                ? "FREE"
                : `₹${event.price}`;

        eventsContainer.innerHTML += `

        <div class="event-card">

            <div class="event-image">

                <img src="${event.image}" alt="${event.title}">

                <span class="category-badge">
                    ${event.category}
                </span>

                <span class="price-tag">
                    ${price}
                </span>

            </div>

            <div class="event-info">

                <h3 class="event-title">
                    ${event.title}
                </h3>

                <p class="event-description">
                    ${event.description}
                </p>

                <div class="event-meta">

                    <p>
                        <i class="fa-solid fa-location-dot"></i>
                        ${event.location}
                    </p>

                    <p>
                        <i class="fa-solid fa-calendar"></i>
                        ${event.date}
                    </p>

                    <p>
                        <i class="fa-solid fa-clock"></i>
                        ${event.time}
                    </p>

                </div>

                <button
                    class="event-btn"
                    onclick="viewDetails(${event.id})">

                    View Details

                </button>

            </div>

        </div>

        `;

    });

}

// Search + Filters
function filterEvents() {

    const search = searchInput.value.toLowerCase();

    const category = categoryFilter.value;

    const location = locationFilter.value;

    const filteredEvents = events.filter(event => {

        const matchesSearch =

            event.title.toLowerCase().includes(search) ||

            event.description.toLowerCase().includes(search);

        const matchesCategory =

            category === "All" ||

            event.category === category;

        const matchesLocation =

            location === "All" ||

            event.location === location;

        return (

            matchesSearch &&
            matchesCategory &&
            matchesLocation

        );

    });

    displayEvents(filteredEvents);

}

// Future Ready
function viewDetails(id){

    window.location.href =
    `event-details.html?id=${id}`;

}

// Event Listeners

if(searchInput){

    searchInput.addEventListener("input",filterEvents);

}

if(categoryFilter){

    categoryFilter.addEventListener("change",filterEvents);

}

if(locationFilter){

    locationFilter.addEventListener("change",filterEvents);

}

// Initial Load

if(typeof events !== "undefined"){

    displayEvents(events);

}