const form = document.querySelector('[data-formulario]');
const lista = document.querySelector('[data-lista]');
let listaDeObjetos = JSON.parse(localStorage.getItem('itens')) || [];

carregaItensInicial();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validaItem(e); 
});

function carregaItensInicial() {
    listaDeObjetos.forEach(elemento => {
        criaItemLista(elemento.item, elemento.quantidade);
    });
};

function validaItem(e) {
    let item = e.target.children[1].value;
    let quantidade = e.target.children[3].value;

    let existe = listaDeObjetos.find(itemDaLista => itemDaLista.item == item);

    if(existe) {
        retificaQuantidade(existe, quantidade, item);
    } else {
        listaDeObjetos.push({
            'item': item,
            'quantidade': Number(quantidade)
        });
        
        localStorage.setItem('itens', JSON.stringify(listaDeObjetos));

        criaItemLista(item, quantidade); 
    };  
};

function retificaQuantidade(existe, quantidade, item) {
    existe.quantidade = Number(quantidade);
    let itensDaLista = document.querySelectorAll('.item');

    itensDaLista.forEach(elemento => {
        let objeto = elemento.childNodes[1].textContent;
        let quantidadesDeObjetos = elemento.childNodes[0];

        if (item == objeto) {
            quantidadesDeObjetos.textContent = Number(quantidade);
            localStorage.setItem('itens', JSON.stringify(listaDeObjetos));
        };
    });
};

function criaItemLista(item, quantidade) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const novaQuantidade = document.createElement('strong');
    novaQuantidade.innerHTML += quantidade;
    novoItem.appendChild(novaQuantidade);

    novoItem.innerHTML += item;

    const botao = document.createElement('button');
    botao.classList.add('botao');
    botao.innerHTML += 'x';
    novoItem.appendChild(botao);

    lista.appendChild(novoItem);

    deletaItem(botao, listaDeObjetos);
};

function deletaItem(botao, lista) {
    botao.addEventListener('click', () => {
        let itemRemovido = botao.parentNode.childNodes[1].textContent;

        lista.splice(lista.findIndex(itemDaLista => itemDaLista.item == itemRemovido ), 1) ;
        
        localStorage.setItem('itens', JSON.stringify(listaDeObjetos));
        
        botao.parentNode.remove();
    });
};
