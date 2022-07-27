import { Controller } from "./Controller.js";

if (!localStorage.getItem('tarefas')) {
    localStorage.setItem('tarefas', JSON.stringify([]))
}

let $ = document.querySelector.bind(document)
let controller = new Controller


const form = $('#form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { titulo, descricao, data, categoria } = e.target

    const nova_tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
        data: data.value,
        categoria: categoria.value
    }

    controller.adicionaTarefa(nova_tarefa)

})


$('#btn-add-tarefa').addEventListener('click', () => iniciaModal())
$("#texto-empty-note").addEventListener('click', () => iniciaModal())
$("#img-empty-note").addEventListener('click', () => iniciaModal())

function iniciaModal() {

    const modal = $('#modal-container')
    modal.style.visibility = 'visible'

    $('#btn-modal-can').addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.visibility = 'hidden'
    })
}

function confereEmptyImg() {
    let tarefas = localStorage.getItem('tarefas')
    if (!JSON.parse(tarefas).length) {
        $('#empty-note').style.display = 'flex'
    } else {
        $('#empty-note').style.display = 'none'
    }
}
confereEmptyImg()
