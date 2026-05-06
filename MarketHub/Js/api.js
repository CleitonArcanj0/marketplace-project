


export async function buscarProdutos() {
    try {
        const produto = await fetch("https://dummyjson.com/products")
        if (!produto.ok) {
            console.log("erro na rede")
        }
        const dados = await produto.json()

        console.log(dados)

        return dados


    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)
    }

}

export async function pesquisarProdutos(produto) {
    try {
        const resposta = await fetch(`https://dummyjson.com/products/search?q=${produto}`)
        if (!resposta.ok) {
            console.log("Erro na requisição");
        }
        const dados = await resposta.json()

        if (dados.products.length == 0) {
            console.log("Nenhum produto encontrado!")
            return ''
        }
        console.log(dados)
        return dados


    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)
    }
}

export async function filtrarCategoria(produto) {
    try {
        const categoria = await fetch(`https://dummyjson.com/products/category/${produto}`)
        if (!categoria.ok) {
            console.log("erro na rede")
            return
        }
        const dados = await categoria.json()

        return dados
    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)

    }

}
export async function descricaoCompleta(produto) {

    try {
        const resposta = await fetch(`https://dummyjson.com/products/search?q=${produto}`)

        if (!resposta.ok) {
            console.log("Erro na requisição!")
            return
        }

        const dados = await resposta.json()
        return dados


    } catch (error) {
        console.log(`Erro ao buscar dados ${error}`)
    }

}

export async function categorias(){
    try {
        const resposta = await fetch('https://dummyjson.com/products/category-list')

        if(!resposta.ok){
            console.log("Erro na requisição")
            return
        }
        const dados = await resposta.json()
        return dados
        console.log(dados)

    } catch (error) {
        console.log(`Erro ao buscar dados ${error}`)
    }
}
