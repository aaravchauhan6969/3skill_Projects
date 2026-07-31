// ==========================================
// EVENTHUB BOOKING SYSTEM
// PART 4A
// ==========================================

// ---------- URL PARAMS ----------

const params = new URLSearchParams(window.location.search);

const eventId = Number(params.get("id"));

// ---------- CURRENT EVENT ----------

let currentEvent = null;

// ---------- FIND EVENT ----------

if (typeof events !== "undefined") {

    currentEvent = events.find(event => event.id === eventId);

}

// ---------- LOAD SUMMARY ----------

function loadBookingSummary() {

    if (!currentEvent) return;

    const summaryImage = document.getElementById("summaryImage");
    const summaryTitle = document.getElementById("summaryTitle");
    const summaryDate = document.getElementById("summaryDate");
    const summaryLocation = document.getElementById("summaryLocation");
    const summaryPrice = document.getElementById("summaryPrice");
    const totalPrice = document.getElementById("totalPrice");

    if (summaryImage)
        summaryImage.src = currentEvent.image;

    if (summaryTitle)
        summaryTitle.textContent = currentEvent.title;

    if (summaryDate)
        summaryDate.textContent = currentEvent.date;

    if (summaryLocation)
        summaryLocation.textContent = currentEvent.location;

    if (summaryPrice)
        summaryPrice.textContent =
            currentEvent.price === 0
            ? "FREE"
            : `₹${currentEvent.price}`;

    if (totalPrice)
        totalPrice.textContent =
            currentEvent.price === 0
            ? "FREE"
            : `₹${currentEvent.price}`;

}

// ---------- AUTO FILL USER ----------

function autoFillUser() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!user) return;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    if (fullName)
        fullName.value = user.name;

    if (email)
        email.value = user.email;

    if (phone)
        phone.value = user.phone;

}

// ---------- GO TO BOOKING ----------

function goToBooking() {

    if (!currentEvent) {

        alert("Event not found.");

        return;

    }

    window.location.href =
        `booking.html?id=${currentEvent.id}`;

}


// ---------- INIT ----------

window.addEventListener("DOMContentLoaded", () => {

    loadBookingSummary();

    autoFillUser();

});
// ==========================================
// PART 4B
// TICKET CALCULATION + SAVE BOOKING
// ==========================================

// ---------- ELEMENTS ----------

const bookingForm = document.getElementById("bookingForm");
const ticketSelect = document.getElementById("tickets");

// ---------- UPDATE TOTAL ----------

function updateTotalPrice() {

    if (!currentEvent) return;

    const totalPrice = document.getElementById("totalPrice");

    if (!totalPrice) return;

    const tickets = Number(ticketSelect.value);

    if (currentEvent.price === 0) {

        totalPrice.textContent = "FREE";

        return;

    }

    const total = currentEvent.price * tickets;

    totalPrice.textContent = `₹${total}`;

}

// ---------- SAVE BOOKING ----------

function saveBooking(e) {

    e.preventDefault();

    if (!currentEvent) {

        alert("Event not found.");

        return;

    }

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const tickets = Number(ticketSelect.value);

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    // ---------- VALIDATION ----------

    if (
        !fullName ||
        !email ||
        !phone ||
        !paymentMethod
    ) {

        alert("Please fill all required fields.");

        return;

    }

    // ---------- BOOKINGS ----------

    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    const booking = {

        bookingId:
            "BK" + Date.now(),

        eventId:
            currentEvent.id,

        title:
            currentEvent.title,

        image:
            currentEvent.image,

        date:
            currentEvent.date,

        time:
            currentEvent.time,

        location:
            currentEvent.location,

        price:
            currentEvent.price,

        tickets:
            tickets,

        total:

            currentEvent.price === 0

            ? 0

            : currentEvent.price * tickets,

        payment:
            paymentMethod,

        name:
            fullName,

        email:
            email,

        phone:
            phone,

        status:
            "Confirmed",

        bookedAt:
            new Date().toLocaleString()

    };

    bookings.push(booking);

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );

    showBookingSuccess();

}

// ---------- EVENTS ----------

if (ticketSelect) {

    ticketSelect.addEventListener(

        "change",

        updateTotalPrice

    );

}

if (bookingForm) {

    bookingForm.addEventListener(

        "submit",

        saveBooking

    );

}
// ==========================================
// PART 4C
// SUCCESS + REDIRECT + HELPERS
// ==========================================

// ---------- SUCCESS ----------

function showBookingSuccess() {

    const button = document.querySelector(".book-btn");

    if (button) {

        button.classList.add("loading");
        button.disabled = true;

    }

    setTimeout(() => {

        alert("🎉 Booking Confirmed Successfully!");

        if (button) {

            button.classList.remove("loading");
            button.disabled = false;

        }

        window.location.href = "my-bookings.html";

    }, 1500);

}

// ---------- GET BOOKINGS ----------

function getBookings() {

    return JSON.parse(

        localStorage.getItem("bookings")

    ) || [];

}
// ==========================================
// EVENT DETAILS PAGE
// ==========================================

function loadEventDetails() {

    // Check if we're on event-details page
    if (!window.location.pathname.includes("event-details")) {

        return;

    }

    if (!currentEvent) {

        document.querySelector(".details-container").innerHTML = `

            <div style="
                text-align:center;
                width:100%;
                padding:80px;
                color:white;
            ">

                <h2>Event Not Found</h2>

                <p>The requested event does not exist.</p>

            </div>

        `;

        return;

    }

    // Elements

    const image = document.getElementById("eventImage");
    const title = document.getElementById("eventTitle");
    const category = document.getElementById("eventCategory");
    const description = document.getElementById("eventDescription");
    const location = document.getElementById("eventLocation");
    const date = document.getElementById("eventDate");
    const time = document.getElementById("eventTime");
    const price = document.getElementById("eventPrice");
    const organizer = document.getElementById("eventOrganizer");
    const seats = document.getElementById("eventSeats");

    // Fill Data

    if (image)
        image.src = currentEvent.image;

    if (title)
        title.textContent = currentEvent.title;

    if (category)
        category.textContent = currentEvent.category;

    if (description)
        description.textContent = currentEvent.description;

    if (location)
        location.textContent = currentEvent.location;

    if (date)
        date.textContent = currentEvent.date;

    if (time)
        time.textContent = currentEvent.time;

    if (price)
        price.textContent =
            currentEvent.price === 0
            ? "FREE"
            : currentEvent.price;

    // Dummy values (until backend)

    if (organizer)
        organizer.textContent = "EventHub Team";

    if (seats)
        seats.textContent =
            Math.floor(Math.random() * 200) + 50;

    // Image fallback

    // ---------- IMAGE FALLBACK ----------

if (image) {

    image.onerror = function () {

        this.src = "images/default-event.jpg";

    };

}

}
// ==========================================
// HELPERS
// ==========================================

function isEventDetailsPage() {

    return document.getElementById("eventTitle") !== null;

}

function isBookingPage() {

    return document.getElementById("bookingForm") !== null;

}

// ---------- GET BOOKING ----------

function getBookingById(id) {

    const bookings = getBookings();

    return bookings.find(

        booking => booking.bookingId === id

    );

}

// ---------- DELETE BOOKING ----------

function deleteBooking(id) {

    const bookings = getBookings();

    const updatedBookings = bookings.filter(

        booking => booking.bookingId !== id

    );

    localStorage.setItem(

        "bookings",

        JSON.stringify(updatedBookings)

    );

}

// ---------- CLEAR FORM ----------

function clearBookingForm() {

    if (!bookingForm) return;

    bookingForm.reset();

    autoFillUser();

    updateTotalPrice();

}

// ---------- INIT ----------

window.addEventListener("DOMContentLoaded", () => {

    if (isEventDetailsPage()) {

        loadEventDetails();

    }

    if (isBookingPage()) {

        loadBookingSummary();

        autoFillUser();

        updateTotalPrice();

    }

});