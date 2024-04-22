const boton = document.getElementById('ingresar');
const errorMessage = document.getElementById('error-message');

boton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const codigo = document.getElementById("codigo").value;
    const password = document.getElementById("password").value;

    const data = {
        codigo: codigo,
        clave: password
    };

    const loginURL = 'https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login';

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Usuario guardado en localStorage:', user);
        window.location.href = 'notas.html';
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Credenciales inválidas';
        document.getElementById('codigo').value = '';
        document.getElementById('password').value = '';
    });
});

