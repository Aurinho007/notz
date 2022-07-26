import { Controller } from "./Controller.js";

let $ = document.querySelector.bind(document)

let controller = new Controller

controller.populaServerJSON()

$('#btn-add-tarefa').addEventListener('click', () => iniciaModal())
$("#texto-empty-note").addEventListener('click', () => iniciaModal())
$("#img-empty-note").addEventListener('click', () => iniciaModal())

function iniciaModal(){
    const modal = $('#modal-container')
    modal.style.visibility = 'visible'
    
    $('#btn-modal-can').addEventListener('click', (e) =>{
        e.preventDefault()
        modal.style.visibility = 'hidden'
    })
}



const form = $('#form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { titulo, descricao, data, categoria } = 
    e.target

    const nova_tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
        data: data.value,
        categoria: categoria.value
    }

   await controller
   .adicionaTarefa(nova_tarefa)
   .then(() => {
        titulo.value = ''
        descricao.value = ''
        data.value = ''
        categoria.value = ''
        console.log(titulo.value)
    })
   //.then(() => location.reload())

   

})



async function confereEmptyImg(){
    let tarefas = await controller.listasTarefas()
    if(tarefas.length == 0){
        $('#empty-note').style.visibility = "visible"
    } else {
        $('#empty-note').style.visibility = "hidden"
    } 
}

confereEmptyImg()