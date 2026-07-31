// ==========================================
// MY BOOKINGS
// PART 7A
// ==========================================

// ---------- ELEMENTS ----------

const bookingsContainer =
    document.getElementById("bookingsContainer");

const noBookings =
    document.getElementById("noBookings");

// ---------- GET BOOKINGS ----------

function getBookings() {

    return JSON.parse(

        localStorage.getItem("bookings")

    ) || [];

}

// ---------- DISPLAY BOOKINGS ----------

function displayBookings() {

    if (!bookingsContainer) return;

    const bookings = getBookings();

    bookingsContainer.innerHTML = "";

    // ---------- EMPTY ----------

    if (bookings.length === 0) {

        bookingsContainer.style.display = "none";

        noBookings.classList.add("show");

        return;

    }

    bookingsContainer.style.display = "grid";

    noBookings.classList.remove("show");

    // ---------- CARDS ----------

    bookings.forEach(booking => {

        bookingsContainer.innerHTML += `

        <div class="booking-card">

            <img
                src="${booking.image}"
                alt="${booking.title}">

            <div class="booking-body">

                <h3>

                    ${booking.title}

                </h3>

                <span
                    class="status-badge status-confirmed">

                    ${booking.status}

                </span>

                <div class="booking-details">

                    <p>

                        <i class="fa-solid fa-calendar"></i>

                        ${booking.date}

                    </p>

                    <p>

                        <i class="fa-solid fa-clock"></i>

                        ${booking.time}

                    </p>

                    <p>

                        <i class="fa-solid fa-location-dot"></i>

                        ${booking.location}

                    </p>

                    <p>

                        <i class="fa-solid fa-ticket"></i>

                        ${booking.tickets}
                        Ticket(s)

                    </p>

                    <p>

                        <i class="fa-solid fa-wallet"></i>

                        ${booking.payment}

                    </p>

                    <p>

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                        ₹${booking.total}

                    </p>

                </div>

                <div class="booking-actions">

                    <button
                        class="view-btn"
                        onclick="viewBooking('${booking.bookingId}')">

                        View Details

                    </button>

                    <button
                        class="cancel-btn"
                        onclick="cancelBooking('${booking.bookingId}')">

                        Cancel

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
// ==========================================
// PART 7B
// ACTIONS + INIT
// ==========================================

// ---------- VIEW BOOKING ----------

function viewBooking(bookingId) {

    const bookings = getBookings();

    const booking = bookings.find(

        item => item.bookingId === bookingId

    );

    if (!booking) {

        alert("Booking not found.");

        return;

    }

    window.location.href =
        `event-details.html?id=${booking.eventId}`;

}

// ---------- CANCEL BOOKING ----------

function cancelBooking(bookingId) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const bookings = getBookings();

    const updatedBookings = bookings.filter(

        item => item.bookingId !== bookingId

    );

    localStorage.setItem(

        "bookings",

        JSON.stringify(updatedBookings)

    );

    alert("Booking cancelled successfully.");

    displayBookings();

}

// ---------- CLEAR ALL BOOKINGS ----------

function clearAllBookings() {

    const confirmClear = confirm(
        "Delete all bookings?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("bookings");

    displayBookings();

}

// ---------- TOTAL BOOKINGS ----------

function getTotalBookings() {

    return getBookings().length;

}

// ---------- INIT ----------

window.addEventListener("DOMContentLoaded", () => {

    displayBookings();

});