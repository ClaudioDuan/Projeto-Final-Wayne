// resources.js
protectPage(["admin", "manager", "employee"]);

const user = getLoggedUser();
document.getElementById("userName").textContent = user.name;

const resourceList = document.getElementById("resourceList");
const form = document.getElementById("resourceForm");

// Renderiza recursos
function renderResources() {
  const resources = getResources();
  resourceList.innerHTML = "";

  resources.forEach(resource => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${resource.name}</td>
      <td>${resource.type}</td>
      <td>${resource.status}</td>
      <td>
        ${
          user.role === "admin"
            ? `<button onclick="removeResource(${resource.id})">Excluir</button>`
            : "—"
        }
      </td>
    `;

    resourceList.appendChild(tr);
  });
}

// Adicionar recurso (apenas admin)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (user.role !== "admin") {
    alert("Apenas administradores podem adicionar recursos.");
    return;
  }

  const resources = getResources();

  const newResource = {
    id: Date.now(),
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    status: document.getElementById("status").value
  };

  resources.push(newResource);
  saveResources(resources);

  addActivity({
    type: "ADD_RESOURCE",
    user: user.username,
    resource: newResource.name
  });

  form.reset();
  renderResources();
});

// Remover recurso
function removeResource(id) {
  if (!confirm("Deseja remover este recurso?")) return;

  let resources = getResources();
  resources = resources.filter(r => r.id !== id);
  saveResources(resources);

  addActivity({
    type: "REMOVE_RESOURCE",
    user: user.username
  });

  renderResources();
}

// Inicialização
renderResources();
