var nowDate = new Date();

const months = ["January", "February", "March", "April",
"May", "June", "July", "August", "September", "October",
"November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"]


function dateTime_Alert() {
  var hour = document.getElementById("hours").value
  alert("The date today is: " + days[nowDate.getDay()] 
  + " " + nowDate.getDate() + ", " + nowDate.getFullYear() + "\n" 
  + "and the current time is: " 
  + (hour==="12"?   (nowDate.getHours() - 12) : nowDate.getHours()) + ":" + nowDate.getMinutes())
}

function dateTime_page() {
  var hour = document.getElementById("hours").value
  var text = document.getElementById("text")
  text.innerHTML = "The date today is: " + days[nowDate.getDay()] 
  + " " + nowDate.getDate() + ", " + nowDate.getFullYear() + "<br>" 
  + "and the current time is: " 
  + (hour==="12"?   (nowDate.getHours() - 12) : nowDate.getHours()) + ":" + nowDate.getMinutes()
}

