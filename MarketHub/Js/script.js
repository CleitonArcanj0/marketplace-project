import { buscarProdutos, filtrarCategoria, pesquisarProdutos, descricaoCompleta, categorias } from "./api.js";

import { renderProducts, renderSidebar } from "./ui/productsUI.js";
import { renderPageDetails, renderStars } from "./ui/detailsUI.js";
import { renderCheckout } from "./ui/checkoutUI.js";
import { renderCarrinho } from "./ui/cartUI.js";


const containerCards = document.querySelector("#cards"),
    pesquisaInput = document.querySelector(".pesquisarProdutos"),
    iconeBusca = document.querySelector(".iconePesquisa"),
    iconeMenu = document.querySelector(".fa-bars"),
    iconeCarrinho = document.querySelector(".fa-cart-shopping"),
    menuCategorias = document.querySelector("#listaCategorias"),
    sidebarCategoria = document.querySelector(".sidebar-categorias"),
    sidebarCarrinho = document.querySelector(".sidebar-carrinho"),
    container = document.querySelector(".container");




async function init() {
    await carregarProdutos()
    await carregarCategorias()
}

init()



async function carregarProdutos() {
    const dados = await buscarProdutos()
    definirEstado(false, iconeCarrinho)
    renderProducts(containerCards, dados.products)
}
async function carregarCategorias() {
    const lista_categorias = await categorias()
    renderSidebar(menuCategorias, lista_categorias)

}

async function carregarDetalhesDoProduto(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    definirEstado(false, sidebarCategoria, menuCategorias, iconeMenu, pesquisaInput, iconeBusca)
    renderPageDetails(containerCards, produto.products[0])
    atualizarLayout()
    atualizaStars()
}


async function carregarProdutosCategoria(nomeDoProduto) {
    const produto = await filtrarCategoria(nomeDoProduto)
    renderProducts(containerCards, produto.products)

}

async function pesquisar(nomeDoProduto) {
    const produtos = await pesquisarProdutos(nomeDoProduto)
    renderProducts(containerCards, produtos.products)
}

async function carregarCheckout(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)

    definirEstado(false, sidebarCarrinho, sidebarCategoria, iconeCarrinho)
    renderCheckout(containerCards, produto.products[0])
    atualizarLayout()

}

async function carregarCarrinho(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    renderCarrinho(sidebarCarrinho, produto.products[0])

}


containerCards.addEventListener('click', handleProdutosClick)
menuCategorias.addEventListener('click', handleCategoriaClick)
sidebarCarrinho.addEventListener('click', handleProdutosClick)
iconeCarrinho.addEventListener('click', toggleCarrinho)
pesquisaInput.addEventListener('keyup', handlePesquisar)
iconeMenu.addEventListener('click', toggleIconeMenu)

const acao = {
    "btn-ver-mais": botaoVerMais,
    "button-buy": botaoComprar,
    "button-add-cart": botaoAddCarrinho,
    "btn-finalizar-compra-carrinho": botaoComprar,
    "fechar": toggleCarrinho
}

async function handleProdutosClick(e) {
    const nome = e.target.dataset.nome;

    for (const className in acao)
        if (e.target.classList.contains(className)) {
            await acao[className](nome)
            break
        }

}

async function botaoVerMais(nome) {
    await carregarDetalhesDoProduto(nome)
}

async function botaoComprar(nome) {
    await carregarCheckout(nome)

}

async function botaoAddCarrinho(nome) {
    if (!(container.className == "carrinho-aberto")) {
        toggleCarrinho()
        await carregarCarrinho(nome)

    } else {
        toggleCarrinho()

    }

}

async function handleCategoriaClick(e) {
    const liClicado = e.target.closest('li')

    if (!liClicado) return

    const nomeCategoria = liClicado.innerText;
    await carregarProdutosCategoria(nomeCategoria)
    atualizarLayout()

}


function handlePesquisar(e) {
    const nomeProduto = e.target.value;
    pesquisarComDelay(nomeProduto)
}

function toggleIconeMenu() {
    container.classList.toggle("menu-aberto")

}

function toggleCarrinho() {
    container.classList.toggle("carrinho-aberto")
}

function atualizarLayout() {
    container.classList.remove("menu-aberto")
    container.classList.remove("carrinho-aberto")
}

const pesquisarComDelay = debouce(async (nomeProduto) => {
    await pesquisar(nomeProduto)
}, 500)


function debouce(callback, delay) {

    let timer

    return (...args) => {

        clearTimeout(timer)

        setTimeout(() => {

            callback(...args)

        }, delay)
    }

}
function definirEstado(habilitado, ...elemento) {
    elemento.forEach(item => {
        item.disabled = !habilitado
        item.classList.toggle("desativado", !habilitado)

    });

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

