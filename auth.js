// auth.js
// Autenticação e autorização

const SESSION_KEY = "wayne_user_session";

// Login
function login(username, password) {
  const users = getUsers();
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return false;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  addActivity({
    type: "LOGIN",
    user: user.username
  });

  return true;
}

// Retorna usuário logado
function getLoggedUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

// Logout
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}

// Proteção de páginas
function protectPage(allowedRoles = []) {
  const user = getLoggedUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    alert("Acesso negado.");
    window.location.href = "dashboard.html";
  }
}

// Evento do formulário
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (login(username, password)) {
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Usuário ou senha inválidos.";
  }
});
