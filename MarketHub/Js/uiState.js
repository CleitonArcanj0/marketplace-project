import { container } from "./elements.js";


export function atualizarLayout() {
    container.classList.remove("menu-aberto")
    container.classList.remove("carrinho-aberto")
}

export function definirEstado(habilitado, ...elementos) {
    elementos.forEach(item => {
        item.disabled = !habilitado
        item.classList.toggle("desativado", !habilitado)
    });

}

export function toggleIconeMenu() {
    container.classList.toggle("menu-aberto")

}

export function toggleCarrinho() {
    container.classList.toggle("carrinho-aberto")
}


