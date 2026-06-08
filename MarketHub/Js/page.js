import { buscarProdutos, filtrarCategoria, pesquisarProdutos, descricaoCompleta, categorias } from "../Js/services.js";
import { renderProducts, renderSidebar } from "./ui/productsUI.js";
import { renderPageDetails, renderStars } from "./ui/detailsUI.js";
import { renderCheckout } from "./ui/checkoutUI.js";
import { renderCarrinho } from "./ui/cartUI.js";
import { renderNavbar } from './ui/navbarUI.js'
import { definirEstado, atualizarLayout, toggleIconeMenu, toggleCarrinho } from "./uiState.js";
import { estadoDoCarrinho } from "./stateCart.js";
import {
    containerCards,
    sidebarCarrinho,
    sidebarCategoria,
    menuCategorias,
    getIconeMenu,
    getIconeBusca,
    getAreaBusca,
    getIconePesquisa,
    navbar
} from "./elements.js"


export function carregarNavBar() {
    renderNavbar(navbar)

}

export async function carregarProdutos() {
    const dados = await buscarProdutos()

    renderProducts(containerCards, dados.products)
    definirEstado(true, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())

}

export async function carregarDetalhesDoProduto(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    renderPageDetails(containerCards, produto.products[0])
    atualizarLayout()
    atualizaStars()

    definirEstado(false, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())
}


export async function carregarCheckout(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    const estadoCarrinho = estadoDoCarrinho()

    renderCheckout(containerCards, produto.products[0], estadoCarrinho.quantidade, estadoCarrinho.total)
    definirEstado(false, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())
    atualizarLayout()

}
async function carregarProdutosCategoria(nomeDoProduto) {
    const produto = await filtrarCategoria(nomeDoProduto)
    renderProducts(containerCards, produto.products)


}
async function carregarCategorias() {
    const lista_categorias = await categorias()
    renderSidebar(menuCategorias, lista_categorias)

}

export async function carregarCarrinho(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    const estadoCarrinho = estadoDoCarrinho()
    renderCarrinho(sidebarCarrinho, produto.products[0], estadoCarrinho.quantidade, estadoCarrinho.total)

}
export async function pesquisar(nomeDoProduto) {
    const produtos = await pesquisarProdutos(nomeDoProduto)
    renderProducts(containerCards, produtos.products)
}

export async function handleCategoriaClick(e) {
    const liClicado = e.target.closest('li')

    if (!liClicado) return

    const nomeCategoria = liClicado.innerText;
    await carregarProdutosCategoria(nomeCategoria)
    atualizarLayout()

}
function atualizaStars() {
    const ratings = document.querySelectorAll(".rating")

    ratings.forEach(element => {

        const rating = parseFloat(element.dataset.rating)
        const maxStars = 5;

        const porcentagem = (rating / maxStars) * 100

        renderStars(element, porcentagem, maxStars)
    })

}
carregarNavBar()
carregarCategorias()

