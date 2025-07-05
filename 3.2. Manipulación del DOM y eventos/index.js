$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "cd_catalog.xml",
    dataType: "xml",
    success: function (xml) {
      $(xml).find("CD").each(function () {
        const titulo = $(this).find("TITLE").text();
        const artista = $(this).find("ARTIST").text();
        const pais = $(this).find("COUNTRY").text();
        const compania = $(this).find("COMPANY").text();
        const precio = $(this).find("PRICE").text();
        const anio = $(this).find("YEAR").text();

        const fila = `
          <tr>
            <td>${titulo}</td>
            <td>${artista}</td>
            <td>${pais}</td>
            <td>${compania}</td>
            <td>${precio}</td>
            <td>${anio}</td>
          </tr>
        `;

        $("#tablaCDs tbody").append(fila);
      });

      $('#tablaCDs').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        order: [[0, 'asc']],
        language: {
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros por página",
          info: "Mostrando _START_ a _END_ de _TOTAL_ CDs",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
          },
          emptyTable: "No hay datos disponibles en la tabla"
        }
      });
    },
    error: function () {
      alert("No se pudo cargar el archivo XML.");
    }
  });
});
