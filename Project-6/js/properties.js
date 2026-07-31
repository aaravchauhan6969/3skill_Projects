// ========================================
// ESTATEHUB PROPERTY DATABASE
// ========================================

const defaultProperties = [

{
    id:1,
    name:"Luxury Villa",
    city:"Delhi",
    type:"Villa",
    price:"₹1.5 Cr",
    status:"Available",
    image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700"
},

{
    id:2,
    name:"Modern Apartment",
    city:"Mumbai",
    type:"Apartment",
    price:"₹95 Lakhs",
    status:"Available",
    image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700"
},

{
    id:3,
    name:"Green Residency",
    city:"Bangalore",
    type:"Apartment",
    price:"₹82 Lakhs",
    status:"Sold",
    image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700"
},

{
    id:4,
    name:"Business Tower",
    city:"Noida",
    type:"Commercial",
    price:"₹2.8 Cr",
    status:"Available",
    image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700"
},

{
    id:5,
    name:"Open Land Plot",
    city:"Dehradun",
    type:"Land",
    price:"₹48 Lakhs",
    status:"Available",
    image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700"
},

{
    id:6,
    name:"Royal Mansion",
    city:"Jaipur",
    type:"Villa",
    price:"₹3.2 Cr",
    status:"Sold",
    image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0?w=700"
}

];

let properties =
JSON.parse(localStorage.getItem("properties"))
||
defaultProperties;
function saveProperties(){

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

}
if (!localStorage.getItem("properties")) {

    saveProperties();

}
// ==========================
// TOAST NOTIFICATION
// ==========================

function showToast(message,type="success"){

    const toast=document.getElementById("toast");

    if(!toast) return;

    toast.className="";

    toast.classList.add(type);

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
// ========================================
// PROPERTY RENDERING
// ========================================

const propertyContainer = document.getElementById("propertyContainer");

function displayProperties(list){

    if(!propertyContainer) return;

    propertyContainer.innerHTML="";

    list.forEach(property=>{

        propertyContainer.innerHTML += `

<div class="card">

    <img src="${property.image}" alt="${property.name}">

    <h3>${property.name}</h3>

    <p>📍 ${property.city}</p>

    <p><strong>Type:</strong> ${property.type}</p>

    <p><strong>Status:</strong> ${property.status}</p>

    <h4>${property.price}</h4>

    <div class="card-buttons">

        <button class="view-btn" data-id="${property.id}">
            View
        </button>

        <button class="edit-btn" data-id="${property.id}">
            Edit
        </button>

        <button class="delete-btn" data-id="${property.id}">
            Delete
        </button>

    </div>

</div>

`;

    });

}

displayProperties(properties);


// ========================================
// DASHBOARD STATISTICS
// ========================================

const totalProperties=document.getElementById("totalProperties");
const availableProperties=document.getElementById("availableProperties");
const soldProperties=document.getElementById("soldProperties");

if(totalProperties){

    totalProperties.textContent=properties.length;

    availableProperties.textContent=
    properties.filter(p=>p.status==="Available").length;

    soldProperties.textContent=
    properties.filter(p=>p.status==="Sold").length;

}


// ========================================
// VIEW DETAILS
// ========================================

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("view-btn")){

        const id=Number(e.target.dataset.id);

        const property=properties.find(p=>p.id===id);

        const modal=document.getElementById("propertyModal");

const modalImage=document.getElementById("modalImage");
const modalTitle=document.getElementById("modalTitle");
const modalCity=document.getElementById("modalCity");
const modalType=document.getElementById("modalType");
const modalStatus=document.getElementById("modalStatus");
const modalPrice=document.getElementById("modalPrice");

modalImage.src=property.image;

modalTitle.textContent=property.name;

modalCity.textContent="📍 "+property.city;

modalType.textContent="🏷 Type : "+property.type;

modalStatus.textContent="📋 Status : "+property.status;

modalPrice.textContent=property.price;

modal.classList.add("active");

    }

});
// =====================================
// UPDATE DASHBOARD STATS
// =====================================

function updateStats(){

    if(!totalProperties) return;

    totalProperties.textContent = properties.length;

    availableProperties.textContent =
        properties.filter(p=>p.status==="Available").length;

    soldProperties.textContent =
        properties.filter(p=>p.status==="Sold").length;
        const totalAgents =
document.getElementById("totalAgents");

if(totalAgents){

const agents =
JSON.parse(localStorage.getItem("agents")) || [];

totalAgents.textContent =
agents.length;

}

}

updateStats();


// =====================================
// LIVE SEARCH
// =====================================

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const keyword = searchInput.value.toLowerCase();

const filtered = properties.filter(property=>{

return property.name.toLowerCase().includes(keyword)

||

property.city.toLowerCase().includes(keyword);

});

displayProperties(filtered);

});

}


// =====================================
// FILTER
// =====================================

const filterType=document.getElementById("filterType");

if(filterType){

filterType.addEventListener("change",()=>{

const value=filterType.value;

if(value==="All"){

displayProperties(properties);

return;

}

const filtered=

properties.filter(property=>property.type===value);

displayProperties(filtered);

});

}


// ========================
// ADD PROPERTY MODAL
// ========================

if(addModal){

    const closeAdd = document.querySelector(".close-add");

    if(closeAdd){

        closeAdd.addEventListener("click",()=>{

            addModal.classList.remove("active");

        });

    }

    window.addEventListener("click",(e)=>{

        if(e.target===addModal){

            addModal.classList.remove("active");

        }

    });

}

document
.querySelector(".close-add")
.addEventListener("click",()=>{

addModal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

if(e.target===addModal){

addModal.classList.remove("active");

}

});
// ========================
// PROPERTY FORM
// ========================

const propertyForm=document.getElementById("propertyForm");

if(propertyForm){

propertyForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name=document
.getElementById("propertyName")
.value;

const city=document
.getElementById("propertyCity")
.value;

const type=document
.getElementById("propertyType")
.value;

const price=document
.getElementById("propertyPrice")
.value;

const image=

document.getElementById("propertyImage")
.value ||

"https://images.unsplash.com/photo-1600585154340-be6161a56a0?w=700";

properties.push({

id:Date.now(),

name,

city,

type,

price,

status:"Available",

image

});
saveProperties();

displayProperties(properties);

updateStats();

propertyForm.reset();

addModal.classList.remove("active");
showToast("🏠 Property Added Successfully");
});
}
// =====================================
// DELETE PROPERTY
// =====================================

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("delete-btn"))

return;

const id=Number(e.target.dataset.id);

const index=

properties.findIndex(property=>property.id===id);

if(index===-1)

return;

if(confirm("Delete this property?")){

properties.splice(index,1);
saveProperties();
displayProperties(properties);

updateStats();
showToast("🗑️ Property Deleted","error");
}

});


// =====================================
// EDIT PROPERTY
// =====================================

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("edit-btn"))

return;

const id=Number(e.target.dataset.id);

const property=

properties.find(p=>p.id===id);

if(!property)

return;

property.name=

prompt("Property Name",property.name)||property.name;

property.city=

prompt("City",property.city)||property.city;

property.price=

prompt("Price",property.price)||property.price;

displayProperties(properties);
updateStats();

saveProperties();
showToast("✏️ Property Updated");
});

const modal=document.getElementById("propertyModal");

if(modal){

document
.querySelector(".close-modal")
.addEventListener("click",()=>{

modal.classList.remove("active");

});

document
.getElementById("closeModalBtn")
.addEventListener("click",()=>{

modal.classList.remove("active");

});

modal.addEventListener("click",(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

});

}