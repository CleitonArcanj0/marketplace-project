import { router, navegacao } from "./router.js";
import { pesquisar, handleCategoriaClick, carregarCarrinho } from "./page.js";
import { toggleCarrinho, toggleIconeMenu, definirEstado } from "./uiState.js";
import {
    containerCards,
    sidebarCarrinho,
    sidebarCategoria,
    menuCategorias,
    iconeMenu,
    pesquisaInput,
    iconeBusca,
    container

} from "./elements.js"


containerCards.addEventListener('click', handleProdutosClick)
menuCategorias.addEventListener('click', handleCategoriaClick)
sidebarCarrinho.addEventListener('click', handleProdutosClick)
pesquisaInput.addEventListener('keyup', handlePesquisar)
iconeMenu.addEventListener('click', toggleIconeMenu)

window.addEventListener('hashchange', () => {
    router()

    iconeBusca.classList.contains('desativado')
        && (
            definirEstado(true, sidebarCategoria, menuCategorias, iconeMenu, pesquisaInput, iconeBusca)
        )

})
window.addEventListener('DOMContentLoaded',
    router()
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
    const inputQuantidade = document.querySelector(".contador")
    let quantidade = parseInt(inputQuantidade.value)

    if (e == 'botaoMais' && quantidade < 99) {
        quantidade++
    } else if (e == 'botaoMenos' && quantidade > 1) {
        quantidade--
    }

    inputQuantidade.value = quantidade
    localStorage.setItem("quantidade", quantidade)

}
function apagarQuantidadeCarrinho() {
    localStorage.removeItem("quantidade")
}





