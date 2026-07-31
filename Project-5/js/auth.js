// ==========================================
// EVENTHUB AUTH SYSTEM
// Frontend Only (LocalStorage)
// ==========================================

// ---------- REGISTER ----------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("Email already registered.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}

// ---------- LOGIN ----------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(user => {

            return user.email === email &&
                   user.password === password;

        });

        if (!validUser) {

            alert("Invalid Email or Password.");

            return;

        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(validUser)
        );

        alert("Login Successful!");

        window.location.href = "index.html";

    });

}

// ---------- LOGOUT ----------

function logout(){

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully.");

    window.location.href="login.html";

}

// ---------- CHECK LOGIN ----------

function isLoggedIn(){

    return localStorage.getItem("loggedInUser") !== null;

}

// ---------- GET USER ----------

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem("loggedInUser")
    );

}

// ---------- UPDATE NAVBAR ----------

window.addEventListener("DOMContentLoaded",()=>{

    const loginBtn=document.querySelector(".login-btn");

    const registerBtn=document.querySelector(".register-btn");

    if(isLoggedIn()){

        const user=getCurrentUser();

        if(loginBtn){

            loginBtn.textContent=user.name.split(" ")[0];

            loginBtn.disabled=true;

        }

        if(registerBtn){

            registerBtn.textContent="Logout";

            registerBtn.onclick=logout;

        }

    }

});