    class Publicacion {
        constructor(titulo, contenido, autor, fecha) {
            this.titulo = titulo;
            this.contenido = contenido;
            this.autor = autor;
            this.fecha = fecha;
        }
    }

    // formulario manual a JSON
    document.getElementById('manualForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const contenido = document.getElementById('contenido').value;
        const autor = document.getElementById('autor').value;
        const fecha = document.getElementById('fecha').value;

        const publicacion = new Publicacion(titulo, contenido, autor, fecha);
        const jsonOutput = JSON.stringify(publicacion, null, 2);
        document.getElementById('jsonOutput').textContent = jsonOutput;
    });

    // JSON formulario a tabla
    document.getElementById('jsonForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const input = document.getElementById('publicacionJson').value;
        let publicaciones;

        try {
            publicaciones = JSON.parse(input);
        } catch (e) {
            alert('El JSON ingresado no es válido.');
            return;
        }

        // Validar cadena
        if (!Array.isArray(publicaciones)) {
            alert('El JSON debe ser un arreglo de publicaciones.');
            return;
        }

        const validKeys = ['titulo', 'contenido', 'autor', 'fecha'];
        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        validKeys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        publicaciones.forEach(pub => {
            const row = document.createElement('tr');
            validKeys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = pub[key] || '';
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const tableOutput = document.getElementById('tableOutput');
        tableOutput.innerHTML = '';
        tableOutput.appendChild(table);
    });
