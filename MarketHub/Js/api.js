const conteiner = document.querySelector(".conteiner")

async function buscarProdutos() {
    try {
        const produto = await fetch("https://dummyjson.com/products")
        if (!produto.ok) {
            console.log("error na rede")
        }
        const dados = await produto.json()

        console.log(dados)

        let html =''
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
