// ================================
// DASHBOARD DATA
// ================================

const properties =
JSON.parse(localStorage.getItem("properties")) || [];

const agents =
JSON.parse(localStorage.getItem("agents")) || [];

const enquiries =
JSON.parse(localStorage.getItem("enquiries")) || [];


// ================================
// BAR CHART
// ================================

new Chart(

document.getElementById("analyticsChart"),

{

type:"bar",

data:{

labels:["Properties","Agents","Enquiries"],

datasets:[{

label:"Total",

data:[

properties.length,

agents.length,

enquiries.length

]

}]

}

}

);


// ================================
// PROPERTY TYPES
// ================================

const villa =
properties.filter(x=>x.type==="Villa").length;

const apartment =
properties.filter(x=>x.type==="Apartment").length;

const commercial =
properties.filter(x=>x.type==="Commercial").length;

const land =
properties.filter(x=>x.type==="Land").length;

new Chart(

document.getElementById("propertyChart"),

{

type:"pie",

data:{

labels:[

"Villa",

"Apartment",

"Commercial",

"Land"

],

datasets:[{

data:[

villa,

apartment,

commercial,

land

]

}]

}

}

);