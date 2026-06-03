
export function renderCheckout(form, produto, quantidade, total) {
    form.innerHTML = `   
        <form action="" method="post" class="box-form">
             ${renderFormDadosPessoais()}
             ${renderFormEndereco()}
             ${renderFormFormasdePagamentos()}
            ${renderResumoDoPedido(produto, quantidade, total)}
        </form>
    `;

}

function renderFormDadosPessoais() {
    const html = ` 
    <section class="forms" id="form-dadosPessoais">
            <h4 class="title-forms "> <i class="fa-solid fa-user" style="color: rgb(0, 65, 141);"></i>Dados pessoais
            </h4>
            <label for="nomeCompleto">Nome completo</label>
            <input type="text" id="nomeCompleto" class="input-nome inputs-info" placeholder="Digite seu nome completo">
            <label for="in-email">Email</label>
            <input type="email" id="in-email" class="input-email inputs-info " placeholder="Digite seu email">
            <label for="in-tel">Telefone</label>
            <input type="tel" id="in-tel" class="input-tel inputs-info" placeholder="Digite seu telefone">
        </section>`

    return html;

}
function renderFormEndereco() {
    const html = ` 
    <section class="forms" id="form-endereco">
            <h4 class="title-forms "> <i class="fa-solid fa-location-dot" style="color: rgb(0, 65, 141);"></i>Endereço
                de entrega</h4>
            <label for="in-cep">CEP</label>
            <div class="box-cep">
                <input type="text" maxlength="9" inputmode="numeric" placeholder="00000-000" id="in-cep"
                    class="input-cep inputs-info">
                <input type="button" class="button-form" value="Buscar CEP">
            </div>

            <label for="in-endereco">Endereço</label>
            <input type="text" id="in-endereco" class="input-endereco inputs-info" placeholder="Digite seu endereço">

            <label for="in-numero-cs">Número</label>
            <input type="text" id="in-numero-cs" class="input-numero-cs inputs-info" placeholder="Número">
            <label for="in-completo">Complemento (opcional)</label>
            <input type="text" id="in-completo" class="input-complemento inputs-info" placeholder="Complemento">

            <label for="in-bairro">Bairro</label>
            <input type="text" id="in-bairro" class="input-bairro inputs-info" placeholder="Digite seu bairro">

            <label for="in-cidade">Cidade</label>
            <input type="text" id="in-cidade" class="input-cidade inputs-info" placeholder="Digite sua cidade">

            <label for="in-estado">Estado</label>
            <input type="text" id="in-estado" class="input-estado inputs-info" placeholder="Digite seu estado">
        </section>`

    return html;
}


function renderFormFormasdePagamentos() {
    const html = ` 
     <section class="forms" id="form-pagamento">
            <h4 class="title-forms "> <i class="fa-regular fa-credit-card" style="color: rgb(0, 65, 141);"></i>Método de
                pagamento</h4>
            <p class="checkbox-pagamento"> <input type="radio" name="pagamento"> Cartão de Crédito</p>
            <p class="checkbox-pagamento"> <input type="radio" name="pagamento"> Pix</p>
            <p class="checkbox-pagamento"> <input type="radio" name="pagamento"> Boleto Bancário</p>
        </section>`

    return html;
}

function renderResumoDoPedido(produto, quantidade, total) {
    let html = `  
        <section class="forms box-resumo-pedido" id="resumo-pedido">
            <h1 class="title-forms">Resumo do pedido</h1>
            <div class="box-img">
                <img src="${produto.thumbnail}" alt="imagemDoProduto" class="img-product">
                <div class="info-produtos">
                    <h3>${produto.title}</h3>
                    <p class="txt-verde">R$  ${produto.price.toFixed(2)}</p>
                    <p>Qtd: <span>${quantidade ? quantidade : 1}</span> </p>
                </div>
            </div>
            <hr class="linha-horizontal">

            <div class="box-price">
                <div class="info-compra">
                    <p>Subtotal</p>
                    <p>R$ ${total ? total.toFixed(2) : produto.price.toFixed(2)}</p>
                </div>
                <div class="info-compra">
                    <p>Entrega</p>
                    <p><span class="txt-verde">Grátis</span></p>
                </div>
            </div>
            <hr class="linha-horizontal">
            <div class="box-valor-total">
                <h3 class="total-title">Total</h3>
                <p>R$ ${total ? total.toFixed(2) : produto.price.toFixed(2)}</p>

            </div>

            <div class="box-info-secury">
                <p class="txt-verde"> <i class="fa-solid fa-lock"></i>Compra 100% segura</p>
                <p class="text-pequeno">Seus dados estão protegidos e sua compra é segura</p>
            </div>
        </section>
        <button type="submit" class=" button-primary" id="button-buy">
            Finalizar Compra
        </button>`

    return html;


}