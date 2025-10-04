const grid = document.getElementById("collegeGrid");
const searchInput = document.getElementById("quickSearch");
const suggestionsBox = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");

function displayColleges(filter=""){
  grid.innerHTML="";
  const q = filter.toLowerCase().trim();
  const list = window.colleges.filter(c=>{
    if(!q) return true;
    return c.name.toLowerCase().includes(q) || (c.about && c.about.toLowerCase().includes(q));
  });
  if(list.length===0){
    grid.innerHTML=`<p style="grid-column:1/-1;text-align:center;">No colleges found for "<b>${filter}</b>"</p>`;
    return;
  }
  list.forEach(c=>{
    const card = document.createElement("article");
    card.className="card fade-in";
    card.innerHTML=`<h3>${c.name}</h3>
      <p>${c.about || ""}</p>
      <a class="card-link" href="college.html?id=${c.id}">View details →</a>`;
    grid.appendChild(card);
  });
}
displayColleges();

searchBtn.addEventListener("click", ()=>displayColleges(searchInput.value));
searchInput.addEventListener("keydown", e=>{
  if(e.key==="Enter"){ e.preventDefault(); displayColleges(searchInput.value); suggestionsBox.style.display="none"; }
});

function showSuggestions(){
  const q = searchInput.value.toLowerCase().trim();
  const matches = window.colleges.filter(c=> c.name.toLowerCase().includes(q) || (c.about && c.about.toLowerCase().includes(q)));
  suggestionsBox.innerHTML="";
  if(matches.length===0){ suggestionsBox.style.display="none"; return; }
  matches.slice(0,8).forEach(c=>{
    const li = document.createElement("li");
    li.textContent = c.name;
    li.addEventListener("click", ()=>{ window.location.href=`college.html?id=${c.id}`; });
    suggestionsBox.appendChild(li);
  });
  suggestionsBox.style.display="block";
}
searchInput.addEventListener("input", showSuggestions);
searchInput.addEventListener("focus", showSuggestions);
document.addEventListener("click", e=>{
  if(!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) suggestionsBox.style.display="none";
});
