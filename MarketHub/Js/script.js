import { buscarProdutos, filtrarCategoria, pesquisarProdutos, descricaoCompleta, categorias } from "./api.js";

import { renderProducts, renderSidebar } from "./ui/productsUI.js";
import { renderPageDetails, renderStars } from "./ui/detailsUI.js";
import { renderCheckout } from "./ui/checkoutUI.js";


const containerCards = document.querySelector("#cards"),
    pesquisaInput = document.querySelector(".pesquisarProdutos"),
    iconeMenu = document.querySelector(".fa-bars"),
    menuCategorias = document.querySelector(".categorias"),
    container = document.querySelector(".container");



async function init() {
    await carregarProdutos()
    await carregarCategorias()
}

init()



async function carregarProdutos() {
    const dados = await buscarProdutos()
    renderProducts(containerCards, dados.products)

}
async function carregarCategorias() {
    const lista_categorias = await categorias()
    renderSidebar(menuCategorias, lista_categorias)

}

async function carregarDetalhesDoProduto(nomeDoProduto) {
    const produto = await descricaoCompleta(nomeDoProduto)
    renderPageDetails(containerCards, produto.products[0])
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
    renderCheckout(containerCards, produto.products[0])
}



containerCards.addEventListener('click', handleProdutosClick)
menuCategorias.addEventListener('click', handleCategoriaClick)
pesquisaInput.addEventListener('keyup', handlePesquisar)
iconeMenu.addEventListener('click', toggleIconeMenu)

async function handleProdutosClick(e) {

    if (e.target.classList.contains("btn-ver-mais")) {
        const nome = e.target.dataset.nome;
        await carregarDetalhesDoProduto(nome)

    }else if (e.target.classList.contains("button-buy")) {
        const nome = e.target.dataset.nome;
        await carregarCheckout(nome)

    }
  

}

async function handleCategoriaClick(e) {
    const liClicado = e.target.closest('li')

    if (!liClicado) return

    const nomeCategoria = liClicado.innerText;
    await carregarProdutosCategoria(nomeCategoria)

}

function handlePesquisar(e) {
    const nomeProduto = e.target.value;
    pesquisarComDelay(nomeProduto)
}

async function toggleIconeMenu() {
    document.querySelector(".container").classList.toggle("menu-aberto")


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


function atualizaStars() {
    const ratings = document.querySelectorAll(".rating")

    ratings.forEach(element => {

        const rating = parseFloat(element.dataset.rating)
        const maxStars = 5;

        const porcentagem = (rating / maxStars) * 100

        renderStars(element, porcentagem, maxStars)
    })

}

