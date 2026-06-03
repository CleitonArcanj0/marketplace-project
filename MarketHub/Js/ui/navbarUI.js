export function renderNavbar(header) {
    const html = ` <div class="logo">
            <i class="fa-solid fa-bars fa-2xl " ></i>
            <i class="fa-solid fa-bag-shopping fa-2xl"></i>
            <h1>MarketHub</h1>
        </div>
        <div class="info-users">
        
          
        </div>

        <div class="areaBusca ">
            <span class="material-symbols-outlined iconePesquisa ">
                search
            </span>
            <label for="pesquisar" class="sr-only">Buscar Produtos</label>
            <input type="text" placeholder="Buscar Produtos" id="pesquisar" class="pesquisarProdutos">
        </div>`

    header.innerHTML = html
}
