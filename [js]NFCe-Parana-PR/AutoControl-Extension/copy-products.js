//Ctrl+Left+Z

ACtl.runInPageCtx( ()=>{

/* NEWER Get NFC-e Data */

console.clear()

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function get_products() {

    itemsTableHTML = document.querySelector(`#tabResult`).cloneNode(true)
    listaProdutos = []
    chaveNFCe = document.querySelector(`.chave`).cloneNode(true).textContent.replace(/\s+/g, '').trim()
    nfceInfoGeral = document.querySelector(`div.ui-collapsible:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1)`).cloneNode(true).textContent.replace(/\s+/g, ' ').trim().split(` `)
    notaDataEmissao = nfceInfoGeral[7] + ` ` + nfceInfoGeral[8]
    notaNomeContratante = document.getElementById(`u20`).cloneNode(true).textContent.replace(/\s+/g, ' ')
    notaPrecoTotal = document.querySelector(`[class='totalNumb txtMax']`).cloneNode(true).textContent
    chaveNFCe = document.querySelector(`.chave`).cloneNode(true).textContent.replace(/ /g, '')

    listaProdutos = []

    // Adicionar no array listaProdutos os produtos
    itemsTableHTML.querySelectorAll(`tr`).forEach(function (item) {

        let produtoExistente = false;

        let produtoNome, produtoCodigo, produtoQtd, produtoUnidadeTipo, produtoPreco, produtoChave
        produtoNome = item.querySelector(`.txtTit`).textContent
        produtoCodigo = item.querySelector(`.RCod`).textContent.match(/\d+/g)[0]
        produtoQtdOriginal = item.querySelector(`.Rqtd`).cloneNode(true)
        produtoQtdOriginal.querySelector(`strong`).remove()
        produtoQtd = produtoQtdOriginal.textContent.search(`,`) == -1 ? Number(produtoQtdOriginal.textContent) : produtoQtdOriginal.textContent
        produtoUnidadeTipo = item.querySelector(`.RUN`).cloneNode(true).textContent.replace(`UN: `, ``)
        produtoPreco = item.querySelector(`.valor`).textContent

        let produtoInfo = [notaDataEmissao, produtoCodigo, ``, produtoNome, produtoPreco, produtoQtd, produtoUnidadeTipo]

        // loop no array global dos produtos, para verificar se já foi adicionado
        for (let value of listaProdutos) {
            if (value[3] == produtoInfo[3]) {
                // Sum Price
                value[4] = String(value[4]).replace(",",".")
                produtoPreco = String(produtoPreco).replace(",",".")

                sumProductsPrice = Number(value[4]) + Number(produtoPreco)

                value[4] = String(sumProductsPrice).replace('.', ',');
                
                // Sum Quantity
                value[5] = String(value[5]).replace(",",".")
                produtoQtd = String(produtoQtd).replace(",",".")

                sumProductsQtd = Number(value[5]) + Number(produtoQtd)

                value[5] = String(sumProductsQtd).replace(`.`, `,`)

                produtoExistente = true;
                break;
            } else {
                continue;
            }
        }
        //caso não existir, adicionar ao array global dos produtos
        if (produtoExistente == false) {
            listaProdutos.push(produtoInfo);
        }
    })


    let text = ``
    for (const produto of listaProdutos) {
        for (let index = 0; index < produto.length; index++) {
            if (index != produto.length - 1) {
                text += produto[index] + "\t";
            } else {
                text += produto[index] + "\n";
            }
        }

    }
    navigator.clipboard.writeText(text)
	console.log(listaProdutos)
}

get_products()

})

