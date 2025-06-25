const form = document.getElementById("busquedaForm");
const input = document.getElementById("busquedaInput");
const select = document.getElementById("busquedaSelect");
const tableBody = document.getElementById("tableBody");

window.addEventListener("DOMContentLoaded", searchWithFetch);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

input.addEventListener("input", searchWithFetch);
select.addEventListener("change", searchWithFetch);

function searchWithFetch() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
      const searchTerm = input.value.toLowerCase();
      const field = select.value;

      const filtered = users.filter(user => {
        let value;

        if (field === "id") {
          value = user.id.toString();
          return value.includes(searchTerm);
        }

        if (field.includes(".")) {
          const [first, second] = field.split(".");
          value = user[first]?.[second]?.toLowerCase?.() || "";
        } else {
          value = user[field]?.toLowerCase?.() || "";
        }

        return value.includes(searchTerm);
      });

      tableBody.innerHTML = "";

      if (filtered.length === 0) {
      tableBody.innerHTML = `
          <tr>
          <td colspan="7">No hay usuarios para mostrar.</td>
          </tr>
      `;
      } else {
      filtered.forEach(user => {
          const row = `
          <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.address.city}</td>
              <td>${user.address.street}</td>
          </tr>
          `;
          tableBody.innerHTML += row;
      });
    }

    })
    .catch(error => {
      console.error("Error al obtener datos:", error);
    });
}
