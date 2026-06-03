import { router, navegacao } from "./router.js";
import { pesquisar, handleCategoriaClick, carregarCarrinho, carregarNavBar } from "./page.js";
import { toggleCarrinho, toggleIconeMenu, definirEstado } from "./uiState.js";
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
    getCampoTotal,
    getPrecoProduto, 
    getSubtotal,
    getContador,
    container,

} from "./elements.js"
import { renderCarrinho } from "./ui/cartUI.js";


containerCards.addEventListener('click', handleProdutosClick)
menuCategorias.addEventListener('click', handleCategoriaClick)
sidebarCarrinho.addEventListener('click', handleProdutosClick)


window.addEventListener('hashchange', () => {
    const home = location.pathname === "/MarketHub/"

    router()
    if (home) {
        definirEstado(home, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())
    }

})

window.addEventListener('DOMContentLoaded', () => {
    const home = location.pathname === "/MarketHub/"
    router()
    
    definirEstado(home, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())

    getIconePesquisa()?.addEventListener('keyup', handlePesquisar)
    getIconeMenu()?.addEventListener('click', toggleIconeMenu)


}
)

const acao = {
    "btn-ver-mais": botaoVerMais,
    "button-buy": botaoComprar,
    "button-add-cart": botaoAddCarrinho,
    "btn-finalizar-compra-carrinho": botaoComprar,
    "fechar": toggleCarrinho,
    "btn-mais": handleQuantidadeProduto,
    "btn-menos": handleQuantidadeProduto
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
    await navegacao(`/detalhes/${nome}`)
}

async function botaoComprar(nome) {
    await navegacao(`/checkout/${nome}`)

}

async function botaoAddCarrinho(nome) {
    if (!(container.className == "carrinho-aberto")) {
        toggleCarrinho()
        await carregarCarrinho(nome)

    } else {
        toggleCarrinho()

    }
}


function handlePesquisar(e) {
    const nomeProduto = e.target.value;
    pesquisarComDelay(nomeProduto)
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


function handleQuantidadeProduto(e) {
    const inputQuantidade = getContador()
    let quantidade = parseInt(inputQuantidade.value)

    if (e == 'botaoMais' && quantidade < 99) {
        quantidade++
    } else if (e == 'botaoMenos' && quantidade > 1) {
        quantidade--
    }

    salvarLocalStorage('quantidade', quantidade)

    const obterQt = obterDadosLocalStorage("quantidade")

    inputQuantidade.value = obterQt

    valorFinal(obterQt)
}

function valorFinal(quantidade) {
    const subtotal = getSubtotal()
    const precoProduto = getPrecoProduto()
    const campo_total = getCampoTotal()
    const total = quantidade * precoProduto


    salvarLocalStorage('total', total)
    salvarLocalStorage('precoProduto', precoProduto)

    const totalSalvo = Number(obterDadosLocalStorage('total'))

    subtotal.innerText = ` R$ ${totalSalvo.toFixed(2)}`
    campo_total.innerText = ` R$ ${totalSalvo.toFixed(2)}`
}

function salvarLocalStorage(conteudo, variavel) {
    localStorage.setItem(conteudo, variavel)
}

function obterDadosLocalStorage(dados){
    return localStorage.getItem(dados)
}

function apagarQuantidadeCarrinho() {
    localStorage.removeItem("quantidade")
}





