import { buscarProdutos, filtrarCategoria, pesquisarProdutos, descricaoCompleta, categorias } from "./api.js";
import { renderPageDetails, renderProducts, renderSidebar, renderStars } from "./ui.js";

const container_main = document.querySelector("#container-main"),
    container_cards = document.querySelector("#cards"),
    pesquisa = document.querySelector(".pesquisarProdutos"),
    icone_menu_lateral = document.querySelector(".fa-bars"),
    menu_categorias = document.querySelector(".categorias")




async function init() {
    const dados = await buscarProdutos()
    const lista_categorias = await categorias()
    renderProducts(container_cards, dados.products)
    renderSidebar(menu_categorias, lista_categorias)
}

init()

container_cards.addEventListener('click', async (e) => {
    if (e.target.classList.contains("btn-ver-mais")) {
        const nome = e.target.dataset.nome;
        const produto = await descricaoCompleta(nome)

        renderPageDetails(container_cards, produto.products)

    }
    atualizaStars()
})

menu_categorias.addEventListener("click", async (e) => {
    const liClicado = e.target.closest('li')


    if (liClicado) {
        const nome = liClicado.innerText;
        const produto = await filtrarCategoria(nome)
        renderProducts(container_cards, produto.products)

    }
})


let time = null
pesquisa.addEventListener('keyup', (e) => {
    const nomeProduto = e.target.value;
    clearTimeout(time)

    time = setTimeout(async () => {
        const dados = await pesquisarProdutos(nomeProduto)
        renderProducts(container_cards, dados.products)

    }, 500)
})



icone_menu_lateral.addEventListener('click', () => {
    document.querySelector(".container").classList.toggle("menu-aberto")
})



function atualizaStars() {
    const ratings = document.querySelectorAll(".rating")
    ratings.forEach(element => {
        const rating = parseFloat(element.dataset.rating)
        const maxStars = 5;

        const porcentagem = (rating / maxStars) * 100

        renderStars(element, porcentagem, maxStars)
    })

}

