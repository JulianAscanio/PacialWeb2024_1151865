document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    const codigoEstudiante = user.codigo;

    const notasURL = `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${codigoEstudiante}/notas`;

    fetch(notasURL)
        .then(response => response.json())
        .then(data => {
            mostrarDatosEstudiante(data.estudiante);

            mostrarNotasAsignaturas(data.notas);

            const promedioPonderado = calcularPromedioPonderado(data.notas);
            mostrarPromedioPonderado(promedioPonderado);
        })
        .catch(error => {
            console.error('Error al obtener las notas:', error);
            window.location.href = 'index.html';
        });

    function mostrarDatosEstudiante(estudiante) {
        const datosEstudiante = document.getElementById('datos-estudiante');
        datosEstudiante.innerHTML = `<p>Código: ${estudiante.codigo}</p><p>Nombre: ${estudiante.nombre}</p>`;
    }

    function mostrarNotasAsignaturas(notas) {
        const tbody = document.querySelector('#tabla-notas tbody');

        notas.forEach(asignatura => {

            const definitiva = calcularDefinitiva(asignatura);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asignatura.nombre}</td>
                <td>${asignatura.creditos}</td>
                <td>${asignatura.P1}</td>
                <td>${asignatura.P2}</td>
                <td>${asignatura.P3}</td>
                <td>${asignatura.EF}</td>
                <td>${definitiva.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function calcularDefinitiva(asignatura) {
        const definitiva = (asignatura.P1 + asignatura.P2 + asignatura.P3) / 3 * 0.7 + asignatura.EF * 0.3;
        return definitiva;
    }

    function calcularPromedioPonderado(notas) {
        let totalCreditos = 0;
        let sumaDefinitivas = 0;

        notas.forEach(asignatura => {
            const definitiva = calcularDefinitiva(asignatura);
            sumaDefinitivas += definitiva * asignatura.creditos;
            totalCreditos += asignatura.creditos;
        });

        const promedioPonderado = sumaDefinitivas / totalCreditos;
        return promedioPonderado;
    }

    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    cerrarSesionBtn.addEventListener('click', function () {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    function mostrarPromedio(promedio) {
        const promedioEstudiante = document.getElementById('promedio-estudiante');
        promedioEstudiante.innerHTML = `<p>Promedio del Estudiante: ${promedio.toFixed(2)}</p>`;
    }

});

