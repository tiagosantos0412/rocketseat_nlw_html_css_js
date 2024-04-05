let participantes = [
    {
        nome: 'Tiago Felipe dos Santos',
        email: 'tiagosantos@gmail.com',
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataChekin: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: 'Viviane Assis dos Santos',
        email: 'viviane.assis@gmail.com',
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataChekin: null
    },
    {
        nome: 'João da Silva',
        email: 'joaosilva@hotmail.com',
        dataInscricao: new Date(2024, 0, 12, 15, 45),
        dataChekin: new Date(2024, 0, 15, 18, 30)
    },
    {
        nome: 'Maria Souza',
        email: 'mariasouza@yahoo.com',
        dataInscricao: new Date(2024, 3, 1, 10, 0),
        dataChekin: new Date(2024, 3, 5, 12, 15)
    },
    {
        nome: 'Pedro Lima',
        email: 'pedrolima@gmail.com',
        dataInscricao: new Date(2024, 2, 8, 14, 30),
        dataChekin: null
    },
    {
        nome: 'Ana Rodrigues',
        email: 'anarodrigues@hotmail.com',
        dataInscricao: new Date(2024, 0, 28, 8, 10),
        dataChekin: null
    },
    {
        nome: 'Carlos Santos',
        email: 'carlossantos@gmail.com',
        dataInscricao: new Date(2024, 1, 10, 17, 55),
        dataChekin: new Date(2024, 1, 15, 19, 0)
    },
    {
        nome: 'Mariana Oliveira',
        email: 'mariana.oliveira@yahoo.com',
        dataInscricao: new Date(2024, 2, 18, 11, 20),
        dataChekin: new Date(2024, 2, 21, 13, 30)
    },
    {
        nome: 'Rafaela Costa',
        email: 'rafaelacosta@gmail.com',
        dataInscricao: new Date(2024, 1, 5, 16, 40),
        dataChekin: new Date(2024, 1, 8, 18, 10)
    },
    {
        nome: 'Lucas Silva',
        email: 'lucassilva@hotmail.com',
        dataInscricao: new Date(2024, 3, 2, 20, 5),
        dataChekin: null
    }
];


const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataChekin = dayjs(Date.now()).to(participante.dataChekin)
    if(participante.dataChekin === null){
        dataChekin = `
            <button
                data-email="${participante.email}"
                onclick=fazerCheckIn(event)
            >
                Confirmar Check-in
            </button>
        `
    }
    return `
            <tr>
                <td>
                    <strong>
                        ${participante.nome}
                    </strong>
                    <br>
                    <small>
                        ${participante.email}
                    </small>
                </td>
                <td>${dataInscricao}</td>
                <td>${dataChekin}</td>
            </tr> 
            `
}


const mensagem = atualizarLista = (participantes) => {
    //pegar informação do HTML
    let html = ''; // Variável para armazenar o HTML dos participantes

    /**
     * for(let participante of participantes) {
     *      html = html + criarNovoParticipante(participante)
     * }
     */
    
    for (let i = 0; i < participantes.length; i++) {
        html += criarNovoParticipante(participantes[i]); // Concatenando o HTML de cada participante
    }
    //substituir informação do HTML
    document.querySelector('tbody').innerHTML = html;
    
    
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataChekin: null
    }

    //Verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => {
            return p.email === participante.email
        }
    )

    if(participanteExiste){
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //limpar formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = confirm('Tem certeza que deseja fazer o check-in?')
    if(mensagemConfirmacao === false){
        return
    }

    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    participante.dataChekin = new Date()

    atualizarLista(participantes)
}
