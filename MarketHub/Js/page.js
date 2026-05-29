import { buscarProdutos, filtrarCategoria, pesquisarProdutos, descricaoCompleta, categorias } from "./api.js";
import { renderProducts, renderSidebar } from "./ui/productsUI.js";
import { renderPageDetails, renderStars } from "./ui/detailsUI.js";
import { renderCheckout } from "./ui/checkoutUI.js";
import { renderCarrinho } from "./ui/cartUI.js";
import { definirEstado, atualizarLayout, toggleIconeMenu, toggleCarrinho } from "./uiState.js";
import {
    containerCards,
    sidebarCarrinho,
    sidebarCategoria,
    menuCategorias,
    iconeMenu,
    pesquisaInput,
    iconeBusca,
} from "./elements.js"


export async function carregarProdutos() {
    const dados = await buscarProdutos()
 
    renderProducts(containerCards, dados.products)
}

export async function carregarDetalhesDoProduto(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    definirEstado(false, sidebarCategoria, menuCategorias, iconeMenu, pesquisaInput, iconeBusca)
    renderPageDetails(containerCards, produto.products[0])
    atualizarLayout()
    atualizaStars()
}

export async function carregarCheckout(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)

    definirEstado(false, sidebarCategoria, menuCategorias, iconeMenu, pesquisaInput, iconeBusca)
    renderCheckout(containerCards, produto.products[0])
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
export async function carregarCarrinho(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    renderCarrinho(sidebarCarrinho, produto.products[0])

}

carregarCategorias()

