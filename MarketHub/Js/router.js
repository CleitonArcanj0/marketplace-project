import { carregarProdutos, carregarDetalhesDoProduto, carregarCheckout } from './page.js'

const routes = {
    "/MarketHub/": carregarProdutos,
    "/detalhes/": carregarDetalhesDoProduto,
    "/checkout/": carregarCheckout
}

export async function navegacao(path) {
   location.hash = path
   
}

export async function router() {
    const path = location.hash.replace("#","") || "/MarketHub/"

    for (const route in routes) {
        if (route === path) {
            await routes[route]()
            return
        }

        if (path.startsWith(route)) {
            const nome = pathProduct(path)

            await routes[route](nome)

     
            break
        }
    }

}

function pathProduct(path) {
    return decodeURIComponent(path.split("/")[2])

}
