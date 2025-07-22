const affirmations = ["I am loved.", "I am strong.", "I choose peace."];
function newAffirmation() {
  document.getElementById("affirmTxt").textContent = affirmations[Math.floor(Math.random()*affirmations.length)];
}

function saveJournal(){
  const txt = document.getElementById("journalEntry").value;
  if(!txt) return alert("Write something!");
  localStorage.setItem("moodJournal", txt);
  showLastJournal();
}

function showLastJournal(){
  const e = localStorage.getItem("moodJournal");
  document.getElementById("lastEntry").textContent = e ? `Last entry: ${e}` : "";
}
showLastJournal();

function submitTherapy(e){
  e.preventDefault();
  alert("Therapy booked—thank you!");
}

function saveStreak(){
  const streak = {
    water: document.getElementById("chkWater").checked,
    meditate: document.getElementById("chkMeditation").checked,
    compliment: document.getElementById("chkCompliment").checked
  };
  localStorage.setItem("selfCare", JSON.stringify(streak));
  alert("Streak saved!");
}

function postCommunity(){
  const txt = document.getElementById("communityPost").value;
  if (!txt) return;
  const arr = JSON.parse(localStorage.getItem("posts")||"[]");
  arr.push({ text: txt, time: new Date().toLocaleString() });
  localStorage.setItem("posts", JSON.stringify(arr));
  drawPosts();
}

function drawPosts(){
  const arr = JSON.parse(localStorage.getItem("posts")||"[]");
  document.getElementById("posts").innerHTML = arr.map(p => `<p><em>${p.time}:</em><br>${p.text}</p>`).join("<hr>");
}
drawPosts();

// Theme toggle
const btn = document.getElementById("toggleTheme");
btn.addEventListener("click", () => {
  const t = document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  btn.textContent = t === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", t);
});
const saved = localStorage.getItem("theme")||"light";
document.body.dataset.theme = saved;
btn.textContent = saved === "dark" ? "☀️" : "🌙";

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
