export function renderCarrinho(container, produto, quantidade, total) {
    const html = `
            <div class="part-superior-carrinho">

                <h3 class="titulo-carrinho">Meu carrinho</h3>
                <span class="material-symbols-outlined fechar">
                    close
                </span>

            </div>
            <div class="detalhes-qtd-produto">

                <div class="img-xs-produto">
                    <img src="${produto.thumbnail}" alt="imagem do produto">
                </div>

                <div class="qtd-produto-carrinho">

                    <h1>${produto.title}</h1>
                    <p class="preco-carrinho" data-price="${produto.price}">R$ ${produto.price}</p>
                    <div class="seletor-quantidade">
                        <button type="button" class="btn-menos" id="btnMenos" data-nome="botaoMenos">-</button>
                        <input type="number" class="contador" id="quantidade" min="1" max="99" value=${quantidade ? quantidade : "1"} readonly>
                        <button type="button" class="btn-mais" id="btnMais" data-nome="botaoMais">+</button>
                    </div>
                    
                </div>
                </div>
                <div class="linha-carrinho"></div>
              
            <div class="box-price-carrinho">
                <div class="info-compra-carrinho">
                    <p>Subtotal</p>
                    <p class="subtotal">R$ ${total ? total.toFixed(2) : produto.price.toFixed(2)}</p>
                </div>
                <div class="info-compra-carrinho">
                    <p>Entrega</p>
                    <p><span class="txt-verde">Grátis</span></p>
                </div>
            </div>
            <div class="valor-total-carrinho">
                <h3 class="titulo">Total</h3>
                <p class="total">R$ ${total.toFixed(2)}</p>
            </div>
            <button class="btn-finalizar-compra-carrinho" data-nome='${produto.title}'>
                Finalizar a compra
            </button>
`
    container.innerHTML = html
}
