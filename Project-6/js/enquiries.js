// =====================================
// DEFAULT ENQUIRIES
// =====================================

const defaultEnquiries=[

{
id:1,
name:"Rohit Kumar",
phone:"+91 9876543210",
email:"rohit@gmail.com",
property:"Luxury Villa",
date:"31 Jul 2026",
status:"New"
},

{
id:2,
name:"Anjali Sharma",
phone:"+91 9988776655",
email:"anjali@gmail.com",
property:"Modern Apartment",
date:"30 Jul 2026",
status:"Contacted"
},

{
id:3,
name:"Amit Singh",
phone:"+91 9123456789",
email:"amit@gmail.com",
property:"Business Tower",
date:"29 Jul 2026",
status:"Closed"
}

];

// =====================================
// LOCAL STORAGE
// =====================================

let enquiries=
JSON.parse(localStorage.getItem("enquiries"))
||
defaultEnquiries;

function saveEnquiries(){

localStorage.setItem(
"enquiries",
JSON.stringify(enquiries)
);

}

if(!localStorage.getItem("enquiries")){

saveEnquiries();

}

// =====================================
// DISPLAY
// =====================================

const enquiryContainer=
document.getElementById("enquiryContainer");

function displayEnquiries(list=enquiries){

if(!enquiryContainer) return;

enquiryContainer.innerHTML="";

list.forEach(enquiry=>{

enquiryContainer.innerHTML+=`

<div class="enquiry-card">

<h2>${enquiry.name}</h2>

<p>📞 ${enquiry.phone}</p>

<p>📧 ${enquiry.email}</p>

<p>🏠 ${enquiry.property}</p>

<p>📅 ${enquiry.date}</p>

<span class="status ${enquiry.status.toLowerCase()}">

${enquiry.status}

</span>

<div class="enquiry-buttons">

<button
class="view-btn"
data-id="${enquiry.id}">

Details

</button>

<button
class="delete-btn"
data-id="${enquiry.id}">

Delete

</button>

</div>

</div>

`;

});

}

displayEnquiries();

// =====================================
// MODALS
// =====================================

const enquiryModal=document.getElementById("enquiryModal");

const addBtn=document.getElementById("addEnquiryBtn");

addBtn.onclick=()=>{

enquiryModal.classList.add("active");

};

document.querySelector(".close-enquiry").onclick=()=>{

enquiryModal.classList.remove("active");

};

window.onclick=(e)=>{

if(e.target===enquiryModal){

enquiryModal.classList.remove("active");

}

};
// =====================================
// ADD ENQUIRY
// =====================================

const enquiryForm=document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit",(e)=>{

e.preventDefault();

const enquiry={

id:Date.now(),

name:customerName.value,

phone:customerPhone.value,

email:customerEmail.value,

property:propertyInterested.value,

status:customerStatus.value,

date:new Date().toLocaleDateString()

};

enquiries.push(enquiry);

saveEnquiries();

displayEnquiries();

enquiryForm.reset();

enquiryModal.classList.remove("active");

if(typeof showToast==="function"){

showToast("📨 Enquiry Added");

}

});
// =====================================
// VIEW ENQUIRY
// =====================================

const viewModal=document.getElementById("viewEnquiryModal");

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("view-btn"))

return;

const id=
Number(e.target.dataset.id);

const enquiry=
enquiries.find(x=>x.id===id);

viewName.textContent=enquiry.name;

viewPhone.textContent="📞 "+enquiry.phone;

viewEmail.textContent="📧 "+enquiry.email;

viewProperty.textContent="🏠 "+enquiry.property;

viewDate.textContent="📅 "+enquiry.date;

viewStatus.textContent="📌 "+enquiry.status;

viewModal.classList.add("active");

});

document.querySelector(".close-view").onclick=()=>{

viewModal.classList.remove("active");

};

closeView.onclick=()=>{

viewModal.classList.remove("active");

};