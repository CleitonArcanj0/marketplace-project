
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



export function renderPageDetails(container, produto) {
    
   const html =  `
            <section id="detail-product" class="box-detail-product">
                <!--titulo-->
                <h3 class="title-product">${produto.title}</h3>

                <div class="rating" data-rating="${produto.rating}">${produto.rating}</div>

                <div class="img-product">
                    <!--imagem-->
                    <img src="${produto.thumbnail}" alt="imagem do produto" srcset="">
                </div>
                
                <div class="details">
            
                    <!--preço-->
                    <p class="preco-details">R$ ${produto.price.toFixed(2)}</p>
                    
                    <p class="descricao-completa">${produto.description}</p>
                    
                    <ul class="estoque">
                        <li><img src="./img/check_circle_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg"alt="vericacao-svg" srcset=""></li>
                        <li>Em estoque</li>
                    </ul>
                    
                    <!--botão adicionar ao carrinho-->
                    <button class="button-add-cart">Adicionar ao carrinho</button>

                    <!--botão comprar agora-->
                    <button class="button-buy">Comprar agora</button>

                </div>
                </section>
                `
    

    container.innerHTML = html

}
export function renderStars(ratings,porcentagem, maxStars) {
   let html = `
        <svg viewBox="48 0 100 20" width="100%" height="100%">

            <defs>
                <symbol id="star" viewBox="0 0 20 20">
                    <polygon points="10,1 13,7 19,7 14,11 16,18 10,14 4,18 6,11 1,7 7,7"/>
                </symbol>
            </defs>

            <!-- estrelas cinza -->
            <g fill="lightgray">
                ${Array.from({ length: maxStars }, (_, i) =>
                    `<use href="#star" x="${i * 20}" />`
                ).join("")}
            </g>

            <!-- estrelas douradas -->
            <g fill="gold" clip-path="url(#clip)">
                ${Array.from({ length: maxStars }, (_, i) =>
                    `<use href="#star" x="${i * 20}" />`
                ).join("")}
            </g>

            <!-- máscara -->
            <clipPath id="clip">
                <rect x="0" y="0" width="${porcentagem}" height="20"/>
            </clipPath>

        </svg>
    `;

    ratings.innerHTML = html
}
export function renderSidebar(sidebar, lista) {

    let html = lista.map(p => {
        return `<li>${p}</li>`

    }).join("")

    sidebar.innerHTML = html


} 