
const conteiner = document.querySelector(".conteiner"),
    pesquisa = document.querySelector(".pesquisarProdutos")

async function buscarProdutos() {
    try {
        const produto = await fetch("https://dummyjson.com/products")
        if (!produto.ok) {
            console.log("error na rede")
        }
        const dados = await produto.json()

        console.log(dados)

        let html = ''
        dados.products.forEach(element => {
            html += `
             <div class="card_produto">
                <img src="${element.thumbnail}" alt="img" class="imagem_produto">
                <h3 class="titulo_produto">${element.title}</h3>
                <p class="descricao">${element.description}</p>
                <p class="preco">R$ ${element.price.toFixed(2)}</p>
            </div>
            `
        });

        conteiner.innerHTML = html

    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)
    }

}

let time = null
pesquisa.addEventListener("keyup", () => {
    clearTimeout(time)

    time = setTimeout(() => {
        pesquisarProdutos()
    }, 500)
})

async function pesquisarProdutos() {
    const produto = pesquisa.value
    try {
        const resposta = await fetch(`https://dummyjson.com/products/search?q=${produto}`)
        if (!resposta.ok) {
            console.log("Erro na requisição");
        }
        const dados = await resposta.json()

        if (dados.products.length == 0) {
            conteiner.innerHTML = `<p>Nenhum produto encontrado!</p>`
            return
        }


        let html = dados.products.map(p => {
            return `
            <div class="card_produto" >
                    <img src="${p.thumbnail}" alt="img" class="imagem_produto">
                    <h3 class="titulo_produto">${p.title}</h3>
                    <p class="descricao">${p.description}</p>
                    <p class="preco">R$ ${p.price.toFixed(2)}</p>
            </div>`;
        }).join("");

        conteiner.innerHTML = html

    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)
    }
}

async function filtrarCategoria(params) {
    try {
        const categoria = await fetch(`https://dummyjson.com/products/category/${params}`)
        if (!categoria.ok) {
            console.log("error na rede")
        }
        const dados = await categoria.json()

        let html = ''
        dados.products.forEach(element => {
            html += `
             <div class="card_produto">
                <img src="${element.thumbnail}" alt="img" class="imagem_produto">
                <h3 class="titulo_produto">${element.title}</h3>
                <p class="descricao">${element.description}</p>
                <p class="preco">R$ ${element.price.toFixed(2)}</p>
            </div>
            `
        });

        conteiner.innerHTML = html

    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`)

    }

}
buscarProdutos()
