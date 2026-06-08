export const estadoDoCarrinho = () => {
    const getQuantidade = Number(localStorage.getItem("quantidade"))
    const getTotal = Number(localStorage.getItem("total"))
    const getPreco = Number(localStorage.getItem("precoProduto"))
    const getNome = localStorage.getItem("nomeDoProduto")

    return  {
        nome: getNome,
        total: getTotal,
        quantidade: getQuantidade,
        preco: getPreco,

    }
} 