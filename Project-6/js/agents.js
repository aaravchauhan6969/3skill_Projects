// =========================================
// DEFAULT AGENTS
// =========================================

const defaultAgents = [

{
    id:1,
    name:"Rahul Sharma",
    experience:"8 Years",
    phone:"+91 9876543210",
    email:"rahul@estatehub.com",
    image:"https://randomuser.me/api/portraits/men/32.jpg"
},

{
    id:2,
    name:"Priya Verma",
    experience:"5 Years",
    phone:"+91 9876543211",
    email:"priya@estatehub.com",
    image:"https://randomuser.me/api/portraits/women/44.jpg"
},

{
    id:3,
    name:"Aman Singh",
    experience:"10 Years",
    phone:"+91 9876543212",
    email:"aman@estatehub.com",
    image:"https://randomuser.me/api/portraits/men/75.jpg"
}

];


// =========================================
// LOCAL STORAGE
// =========================================

let agents =
JSON.parse(localStorage.getItem("agents"))
||
defaultAgents;

function saveAgents(){

    localStorage.setItem(
        "agents",
        JSON.stringify(agents)
    );

}

if(!localStorage.getItem("agents")){

    saveAgents();

}


// =========================================
// DISPLAY AGENTS
// =========================================

const container=document.getElementById("agentContainer");

function displayAgents(list = agents){

    if(!container) return;

    container.innerHTML = "";

    list.forEach(agent => {

        container.innerHTML += `

        <div class="agent-card">

            <img src="${agent.image}" alt="${agent.name}">

            <h2>${agent.name}</h2>

            <p>💼 Experience: ${agent.experience}</p>

            <p>📞 ${agent.phone}</p>

            <p>📧 ${agent.email}</p>

            <div class="agent-buttons">

                <button
                    class="call-btn"
                    onclick="window.location.href='tel:${agent.phone}'">
                    Call
                </button>

                <button
                    class="email-btn"
                    onclick="window.location.href='mailto:${agent.email}'">
                    Email
                </button>

                <button
                    class="profile-btn"
                    data-id="${agent.id}">
                    Profile
                </button>

            </div>

            <div style="margin-top:12px;">

                <button
                    class="delete-btn"
                    data-id="${agent.id}">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

displayAgents();


// =========================================
// SEARCH
// =========================================

const search=document.getElementById("agentSearch");

if(search){

search.addEventListener("input",()=>{

const keyword=
search.value.toLowerCase();

const filtered=

agents.filter(agent=>

agent.name
.toLowerCase()
.includes(keyword)

);

displayAgents(filtered);

});

}


// =========================================
// DELETE AGENT
// =========================================

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("delete-btn"))

return;

const id=
Number(e.target.dataset.id);

if(confirm("Delete this agent?")){

agents=
agents.filter(agent=>agent.id!==id);

saveAgents();

displayAgents();

if(typeof showToast==="function"){

showToast("🗑️ Agent Deleted","error");

}

}

});
// =========================================
// ADD AGENT MODAL
// =========================================

const addAgentBtn = document.getElementById("addAgentBtn");
const agentModal = document.getElementById("agentModal");

if(addAgentBtn){

    addAgentBtn.addEventListener("click",()=>{

        agentModal.classList.add("active");

    });

}

document.querySelector(".close-agent").addEventListener("click",()=>{

    agentModal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

    if(e.target===agentModal){

        agentModal.classList.remove("active");

    }

});
// =========================================
// ADD AGENT
// =========================================

const agentForm=document.getElementById("agentForm");

if(agentForm){

agentForm.addEventListener("submit",(e)=>{

e.preventDefault();

const newAgent={

id:Date.now(),

name:document.getElementById("agentName").value,

experience:document.getElementById("agentExperience").value,

phone:document.getElementById("agentPhone").value,

email:document.getElementById("agentEmail").value,

image:
document.getElementById("agentImage").value ||

"https://randomuser.me/api/portraits/men/45.jpg"

};

agents.push(newAgent);

saveAgents();

displayAgents();

agentForm.reset();

agentModal.classList.remove("active");

if(typeof showToast==="function"){

showToast("✅ Agent Added Successfully");

}

});

}

// ====================================
// PROFILE MODAL
// ====================================

const profileModal=
document.getElementById("profileModal");

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("profile-btn"))

return;

const id=
Number(e.target.dataset.id);

const agent=
agents.find(a=>a.id===id);

document.getElementById("profileImage").src=
agent.image;

document.getElementById("profileName").textContent=
agent.name;

document.getElementById("profileExperience").textContent=
"💼 Experience : "+agent.experience;

document.getElementById("profilePhone").textContent=
"📞 "+agent.phone;

document.getElementById("profileEmail").textContent=
"📧 "+agent.email;

profileModal.classList.add("active");

});

document
.querySelector(".close-profile")
.onclick=()=>{

profileModal.classList.remove("active");

};

document
.getElementById("closeProfile")
.onclick=()=>{

profileModal.classList.remove("active");

};

profileModal.onclick=(e)=>{

if(e.target===profileModal){

profileModal.classList.remove("active");

}

};