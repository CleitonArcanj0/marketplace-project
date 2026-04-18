
const toggleMenu = () => {
    const listaCategoria = document.getElementById("listaCategorias")
    if (listaCategoria.style.display == 'none') {
        listaCategoria.style.display = 'block';
    } else {
        listaCategoria.style.display = 'none';
    }
}