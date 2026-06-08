export const containerCards = document.querySelector("#cards"),
    navbar = document.querySelector("header"),
    menuCategorias = document.querySelector("#listaCategorias"),
    sidebarCategoria = document.querySelector(".sidebar-categorias"),
    sidebarCarrinho = document.querySelector(".sidebar-carrinho"),
    container = document.querySelector(".container");

export const getAreaBusca = () => document.querySelector(".areaBusca"),
    getPesquisaInput = () => document.querySelector(".pesquisarProdutos"),
    getIconeBusca = () => document.querySelector(".iconePesquisa"),
    getIconePesquisa = () => document.querySelector(".iconePesquisa"),
    getIconeMenu = () => document.querySelector(".fa-bars")

//elementos do carrinho
export const getSubtotal = () => document.querySelector(".subtotal"),
    getPrecoProduto = () => Number(document.querySelector(".preco-carrinho").dataset.price),
    getCampoTotal = () => document.querySelector(".total"),
    getContador = () => document.querySelector(".contador"),
    getNome = () => document.querySelector("#titulo-produto-carrinho").innerText;