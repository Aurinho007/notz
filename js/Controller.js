import { DAO } from "./DAO.js";
import { Helper } from "./Helper.js";
import { View } from "./View.js";

if (!localStorage.getItem('tarefas')) {
    localStorage.setItem('tarefas', JSON.stringify([]))
}

const $ = document.querySelector.bind(document)
const dao = new DAO()
const view = new View()
const helper = new Helper()

carregaHome()
function carregaHome(){

    let tarefas = dao.listarTarefas()

    if(!tarefas.length) {
        $('#container').style.display = 'none'
        $('#empty-note').style.display = 'flex'
    } else {
        $('#container').style.display = 'flex'
        $('#empty-note').style.display = 'none'
        
        view.atualizaInterface()
        carregaApagarBtns()
        carregaEditarBtns()
        carregaChecks()
    }

}

// Adicionar Tarefa
$('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { titulo, descricao, data, categoria } = e.target

    const nova_tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
        data: data.value,
        categoria: categoria.value,
        feito: false,
        id: dao.getId()
    }

    titulo.value = ''
    descricao.value = ''
    // data.value = ''

    await dao.adicionaTarefa(nova_tarefa)
    quitModal()
    carregaHome()                      
    
})

// Apagar Tarefa
function carregaApagarBtns(){

    const apagar_btns = document.querySelectorAll('.btn-apagar')

    apagar_btns.forEach(apagar_btn => {

        apagar_btn.onclick = async () => {
            let idTarefa = parseInt(apagar_btn.parentElement.parentElement.id)
            await dao.removeTarefa(idTarefa)
            carregaHome()
        }
    })
}

// Editar Tarefa 
function carregaEditarBtns(){

    const editar_btns = document.querySelectorAll('.btn-editar')
    
    editar_btns.forEach(editar_btn => {
        console.log(editar_btn)

        editar_btn.onclick = async () => {

            let tarefa = dao.buscaPorId(parseInt(editar_btn.parentElement.parentElement.id))

            $('input#titulo-edit').value = tarefa.titulo
            $('textarea#descricao-edit').value = tarefa.descricao
            $('input#data-input-edit').value = tarefa.data
            $('select#categoria-edit').value = tarefa.categoria
            $('#id-tarefa').value = tarefa.id

            iniciaModalEdit()
        }

    })

}
$('#form-edit').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { titulo, descricao, data, categoria } = e.target

    const tarefa_atualizada = {
        titulo: titulo.value,
        descricao: descricao.value,
        data: data.value,
        categoria: categoria.value,
        feito: false,
        id: parseInt($('#id-tarefa').value)
    }


    await dao.atualizaTarefa(tarefa_atualizada)
    quitModalEdit()
    carregaHome()                      
})

// CheckBox da tarefa 
function carregaChecks(){

    let checks = document.querySelectorAll('.check')

    checks.forEach(check => {

        check.onclick = () => {

            let idTarefa = parseInt(check.parentElement.parentElement.id)

            dao.atualizaCheck(idTarefa)

            if(check.classList.contains('note-nao-feito')){
                check.classList.remove('note-nao-feito')
                check.classList.add('note-feito')
            } else {
                check.classList.remove('note-feito')
                check.classList.add('note-nao-feito')
            }
        
        }
    })

}

//alerta de tarefas vencidas
alertaTarefaVencida()
function alertaTarefaVencida(){

    const dataAtual = new Intl.DateTimeFormat('fr-CA').format(new Date())
    let tarefas = dao.listarTarefas()
    let mensagem = ''

    const tarefasVencidas = tarefas.filter(tarefa => {
        return dataAtual > String(tarefa.data) && !tarefa.feito
    })

    if(tarefasVencidas.length){
        tarefasVencidas.forEach((tarefaVencida) => {
            mensagem += `${tarefaVencida.titulo} que era pro dia ${helper.formataData(tarefaVencida.data)}\n`
        })
            
        alert(`Hmmm... Parece que alguém se esqueceu de\n\n${mensagem}`)
}
   
}

// alerta tarefa para amanhã 
alertaTarefaProxima()
function alertaTarefaProxima(){

    const dataAmanha = helper.dataAmanhaTexto()
    let mensagem = ''
    let tarefas = dao.listarTarefas()

    const tarefasAmanha = tarefas.filter(tarefa => {
        return String(tarefa.data) === dataAmanha && !tarefa.feito
    })

    if(tarefasAmanha.length){
        tarefasAmanha.forEach((tarefaVencida) => {
            mensagem += `${tarefaVencida.titulo}\n`
        })

        
            
        alert(`Eita! Olha ai o que você tem para amanhã:\n\n${mensagem}`)
}

}

// Modal

const modal = $('#modal-container')
$('#btn-add-tarefa').addEventListener('click', () => iniciaModal())
$("#texto-empty-note").addEventListener('click', () => iniciaModal())
$("#btn-img").addEventListener('click', () => iniciaModal())
$('#btn-modal-can').addEventListener('click', () => quitModal())

function iniciaModal() {
    modal.style.visibility = 'visible'
}
function quitModal(){
    modal.style.visibility = 'hidden'
}

const modal_editar = $('#modal-container-edit')
$('#btn-modal-can-edit').addEventListener('click', () => quitModalEdit())

function iniciaModalEdit() {
    modal_editar.style.visibility = 'visible'
}
function quitModalEdit(){
    modal_editar.style.visibility = 'hidden'
}



