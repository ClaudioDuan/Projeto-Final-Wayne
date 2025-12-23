// storage.js
// Camada de persistência de dados (simula um backend)

const DB_KEY = "wayne_security_db";

// Estrutura inicial do banco
const initialData = {
  users: [
    {
      id: 1,
      username: "bruce",
      password: "wayne",
      role: "admin",
      name: "Bruce Wayne"
    },
    {
      id: 2,
      username: "alfred",
      password: "pennyworth",
      role: "manager",
      name: "Alfred Pennyworth"
    },
    {
      id: 3,
      username: "lucius",
      password: "fox",
      role: "employee",
      name: "Lucius Fox"
    }
  ],
  resources: [
    {
      id: 1,
      name: "Batmóvel",
      type: "Veículo",
      status: "Ativo"
    },
    {
      id: 2,
      name: "Sistema de Vigilância",
      type: "Segurança",
      status: "Ativo"
    }
  ],
  activities: []
};

// Inicializa o banco no LocalStorage
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    console.log("Banco de dados Wayne inicializado.");
  }
}

// Retorna todo o banco
function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY));
}

// Salva o banco completo
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Usuários
function getUsers() {
  return getDB().users;
}

function saveUsers(users) {
  const db = getDB();
  db.users = users;
  saveDB(db);
}

// Recursos
function getResources() {
  return getDB().resources;
}

function saveResources(resources) {
  const db = getDB();
  db.resources = resources;
  saveDB(db);
}

// Atividades (logs)
function addActivity(activity) {
  const db = getDB();
  db.activities.push({
    ...activity,
    date: new Date().toISOString()
  });
  saveDB(db);
}

// Inicializa automaticamente
initDB();
