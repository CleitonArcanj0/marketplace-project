# MarketHub

Projeto de estudo que simula um sistema de e-commerce.

## 📋 Índice

- [Tecnologias](#️-tecnologias-usadas)
- [Deploy](#-deploy)
- [Páginas](#-páginas)
- [Instalação](#️-instalação)
- [Licença](#-licença)

---

## 🛠️ Tecnologias usadas

- JavaScript
- HTML
- CSS
- Node.js

---

## 🚀 Deploy

Este projeto está hospedado na [Vercel](https://vercel.com).

🔗 **Acesse aqui:** [markethub.vercel.app](https://markethub-gamma.vercel.app/#/MarketHub/)

---

## 📋 Páginas

### Home
- Exibe os cards dos produtos disponíveis
- Menu lateral com filtro por categorias

### Detalhes do produto
- Visualização completa do produto selecionado
- Opção de adicionar ao carrinho

### Checkout
- Pagamento integrado com Stripe

#### 💳 Cartões de teste

> Use qualquer data futura (ex: `12/34`) e qualquer CVC de 3 dígitos (4 para Amex).

**Pagamentos bem-sucedidos por bandeira:**

| Bandeira            | Número                | CVC       |
|---------------------|-----------------------|-----------|
| Visa                | `4242 4242 4242 4242` | 3 dígitos |
| Visa (débito)       | `4000 0566 5566 5556` | 3 dígitos |
| Mastercard          | `5555 5555 5555 4444` | 3 dígitos |
| Mastercard (débito) | `5200 8282 8282 8210` | 3 dígitos |
| American Express    | `3782 822463 10005`   | 4 dígitos |
| Discover            | `6011 1111 1111 1117` | 3 dígitos |

**Pagamentos recusados:**

| Cenário              | Número                |
|----------------------|-----------------------|
| Pagamento inválido   | `4000 0000 0000 0002` |
| Fundos insuficientes | `4000 0000 0000 9995` |
| CVC incorreto        | `4000 0000 0000 0101` |
| Cartão expirado      | `4000 0000 0000 0069` |

---

## ⚙️ Instalação

**Pré-requisitos:** Node.js e Vercel CLI

```bash
# Instale o Vercel CLI globalmente
npm install -g vercel

# Clone o repositório
git clone https://github.com/usuario/markethub.git

# Entre na pasta
cd markethub

# Instale as dependências
npm install
```

### 🔑 Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
STRIPE_SECRET_KEY=sua_chave_secreta
STRIPE_PUBLIC_KEY=sua_chave_publica
```

> Obtenha suas chaves de teste em [dashboard.stripe.com](https://dashboard.stripe.com) → **Developers → API Keys**

⚠️ **Nunca suba o `.env.local` para o GitHub!** Certifique-se que ele está no `.gitignore`.

### ▶️ Rodando o projeto

1. Acesse **Settings → Environment Variables** no seu projeto na Vercel
2. Adicione `STRIPE_SECRET_KEY` e `STRIPE_PUBLIC_KEY`
3. Sincronize localmente e rode:

```bash
vercel env pull .env.local
vercel dev
```

---
## 📚 Documentação

Caso queira entender melhor as ferramentas utilizadas no projeto:

- [Stripe Docs](https://docs.stripe.com) — integração de pagamentos
- [Vercel Docs](https://vercel.com/docs) — deploy e serverless functions
---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).


## 👤 Autor

**Cleiton Arcanjo**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cleiton-arcanjo-614a6a36a/)