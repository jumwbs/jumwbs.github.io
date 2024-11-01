const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;  // Capturamos el contenedor del producto específico
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    // Aquí obtenemos dinámicamente los valores de talla y cantidad dentro del producto específico
    const tallaSeleccionada = elemento.querySelector('select#talla').value;
    const cantidadSeleccionada = elemento.querySelector('input#cantidad').value;

    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        talla: tallaSeleccionada,  // Guardamos la talla seleccionada
        cantidad: cantidadSeleccionada,  // Guardamos la cantidad seleccionada
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.talla} <!-- Aquí mostramos la talla seleccionada -->
        </td>
        <td>
            ${elemento.cantidad} <!-- Aquí mostramos la cantidad seleccionada -->
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}


// Seleccionar todos los enlaces del menú
const enlaces = document.querySelectorAll('#menu2 a');

// Función para el desplazamiento suave
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const seccion = document.querySelector(this.getAttribute('href'));
        seccion.scrollIntoView({ behavior: 'smooth' });
    });
});

// Detectar la sección activa al hacer scroll
window.addEventListener('scroll', () => {
    let current = '';
    const secciones = document.querySelectorAll('section');
    
    secciones.forEach(seccion => {
        const sectionTop = seccion.offsetTop;
        const sectionHeight = seccion.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = seccion.getAttribute('id');
        }
    });
    
    // Remover clase "active" de todos los enlaces y agregarla al activo
    enlaces.forEach(enlace => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === `#${current}`) {
            enlace.classList.add('active');
        }
    });
});
