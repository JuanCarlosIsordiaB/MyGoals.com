//Variables
const formulario = document.querySelector('#formulario');
const listaMetas = document.querySelector('#lista-metas');
let metas = [];


//EventListeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarMeta);

    document.addEventListener('DOMContentLoaded', () => {
        metas = JSON.parse(localStorage.getItem('metas')) || [];

        console.log(metas);
        crearHtml();
    });
}

//Funciones
function agregarMeta(e) {
    e.preventDefault();

    const meta = document.querySelector('#meta').value;

    if (meta) {
        const metaObj = {
            id: Date.now(),
            meta
        };

        metas = [...metas, metaObj];

        crearHtml();

        formulario.reset();
    } else {
        mensajeError('Write your next goal.');
    }
}

function mensajeError(mensaje) {
    const mensajesExistentes = document.querySelectorAll('.error');

    if (mensajesExistentes.length === 0) {
        const mensajeError = document.createElement('p');
        mensajeError.classList.add('error');
        mensajeError.textContent = mensaje;
        formulario.appendChild(mensajeError);

        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    }
}

function crearHtml() {
    limpiarHtml();

    if (metas.length > 0) {
        metas.forEach(meta => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-meta');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarMeta(meta.id);
            };

            const li = document.createElement('li');

            li.innerText = meta.meta;

            li.appendChild(btnEliminar);

            listaMetas.appendChild(li);
        });
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('metas', JSON.stringify(metas)); // Corregir el nombre del LocalStorage a 'metas'
}

function borrarMeta(id) {
    metas = metas.filter(meta => meta.id !== id);

    crearHtml();
}

function limpiarHtml() {
    while (listaMetas.firstChild) {
        listaMetas.removeChild(listaMetas.firstChild);
    }
}
