
export function renderProducts(container, produtos) {
    let html = ""
    if (!produtos) {
        html = '<p>Produto não encontrado!</p>'

    } else {
        html = produtos.map(p => {
            return `
            <div class="card_produto" >
            <img src="${p.thumbnail}" alt="img" class="imagem_produto">
            <h3 class="titulo_produto">${p.title}</h3>
            <p class="descricao">${p.description}</p>
            <p class="preco">R$ ${p.price.toFixed(2)}</p>
            <button class="btn-ver-mais" data-nome='${p.title}'>Ver mais</button>
            </div>`;
        }).join("");
    }
    container.innerHTML = html
}


export function renderSidebar(sidebar, lista) {

    let html = lista.map(p => {
        return `<li>${p}</li>`

    }).join("")

    sidebar.innerHTML = html


} 