import { router, navegacao } from "./router.js";
import { pesquisar, handleCategoriaClick, carregarCarrinho, carregarNavBar } from "./page.js";
import { toggleCarrinho, toggleIconeMenu, definirEstado } from "./uiState.js";
import { estadoDoCarrinho } from "./stateCart.js";
import { renderCarrinho } from "./ui/cartUI.js";
import { extrairDados } from "../Js/services.js";
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
    getNome,
    container,
    getPesquisaInput,

} from "./elements.js"


containerCards.addEventListener('click', handleProdutosClick)
menuCategorias.addEventListener('click', handleCategoriaClick)
sidebarCarrinho.addEventListener('click', handleProdutosClick)


window.addEventListener('hashchange', () => {
    const home = location.hash === "#/MarketHub/" || location.pathname === "/MarketHub/"
    router()

    if (home) {
        definirEstado(home, getAreaBusca(), getIconeBusca(), getIconeMenu(), getIconePesquisa())
        apagarDadosDoCarrinho()
    }

})

window.addEventListener('DOMContentLoaded', () => {
    navegacao("/MarketHub/")
    router()
    getPesquisaInput().addEventListener('keyup', handlePesquisar)
    getIconeMenu()?.addEventListener('click', toggleIconeMenu)
})

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
    const { produto, preco } = await extrairDados(nome)

    const resposta = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, preco })
    })

    const { url } = await resposta.json()
    console.log('status:', resposta.status)
    window.location.href = url
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
    exibirQuantidade(inputQuantidade)
    valorFinal()
}

function valorFinal() {
    const quantidade = estadoDoCarrinho().quantidade
    const precoProduto = getPrecoProduto()
    const nomeProduto = getNome()

    let total = quantidade * precoProduto
    salvarLocalStorage('nomeDoProduto', nomeProduto)
    salvarLocalStorage('total', total)
    salvarLocalStorage('precoProduto', precoProduto)
    exibirValorTotal()

}

function exibirQuantidade(inputQuantidade) {
    const obterQuantidade = estadoDoCarrinho()
    inputQuantidade.value = obterQuantidade.quantidade
}

function exibirValorTotal() {
    const campo_total = getCampoTotal()
    const totalSalvo = estadoDoCarrinho().total

    campo_total.innerText = ` R$ ${totalSalvo.toFixed(2)}`
}

function salvarLocalStorage(conteudo, variavel) {
    localStorage.setItem(conteudo, variavel)
}

function obterDadosLocalStorage(dados) {
    return localStorage.getItem(dados)
}

function apagarDadosDoCarrinho() {
    localStorage.removeItem("precoProduto")
    localStorage.removeItem("quantidade")
    localStorage.removeItem("total")
    localStorage.removeItem("nomeDoProduto")

}







