// dashboard.js
protectPage(["admin", "manager", "employee"]);

const user = getLoggedUser();
document.getElementById("userName").textContent = user.name;

const db = JSON.parse(localStorage.getItem("wayne_security_db"));

document.getElementById("totalUsers").textContent = db.users.length;
document.getElementById("totalResources").textContent = db.resources.length;
document.getElementById("totalActivities").textContent = db.activities.length;

const activityList = document.getElementById("activityList");

db.activities.slice(-5).reverse().forEach(activity => {
  const li = document.createElement("li");
  li.textContent = `${activity.type} - ${activity.user || "sistema"} (${new Date(activity.date).toLocaleString()})`;
  activityList.appendChild(li);
});

