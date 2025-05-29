document.addEventListener('DOMContentLoaded', () => {
    const miFormulario = document.getElementById('miFormulario');
    const inputBusqueda = document.getElementById('busqueda');
    const divResultados = document.getElementById('resultados');

    miFormulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío tradicional del formulario para manejarlo con JS

        const terminoBusqueda = inputBusqueda.value;

        if (terminoBusqueda.trim() === '') {
            divResultados.innerHTML = '<p>Por favor, introduce un término de búsqueda.</p>';
            return;
        }

        divResultados.innerHTML = '<p>Buscando...</p>'; // Mensaje de carga

        try {
            const response = await fetch(`http://localhost:3000/api/users/search?q=${encodeURIComponent(terminoBusqueda)}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la solicitud');
            }

            const data = await response.json(); // Los resultados que vienen del backend

            if (data.length === 0) {
                divResultados.innerHTML = '<p>No se encontraron resultados para su búsqueda.</p>';
            } else {
                // Limpia los resultados anteriores
                divResultados.innerHTML = '';
                // Itera sobre los resultados y los muestra
                data.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user-item'); // Para aplicar el estilo CSS simple
                    userDiv.innerHTML = `
                        <strong>Nombre:</strong> ${user.name || 'N/A'}<br>
                        <strong>Email:</strong> ${user.email || 'N/A'}<br>
                        `;
                    divResultados.appendChild(userDiv);
                });
            }

        } catch (error) {
            console.error('Error al buscar datos:', error);
            divResultados.innerHTML = `<p style="color: red;">Ocurrió un error al buscar: ${error.message}</p>`;
        }
    });
});