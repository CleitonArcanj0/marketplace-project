export const estadoDoCarrinho = () => {
    const getQuantidade = localStorage.getItem("quantidade")
    const getTotal = Number(localStorage.getItem("total"))
    const getPreco = Number(localStorage.getItem("precoProduto"))

    return {
        quantidade: getQuantidade,
        total: getTotal,
        preco: getPreco,
    }
} 