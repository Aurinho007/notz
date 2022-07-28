import { DAO } from "./DAO.js"
import { Helper } from "./Helper.js"
export class View{

    constructor(){

        this.dao = new DAO()
        this.helper = new Helper()
        this.container = document.querySelector('#container')
    }

    atualizaInterface(){

        let tarefas = this.dao.listarTarefas()
        this._populaContainerTarefas(tarefas)   
    }

    _populaContainerTarefas(tarefas){

        let categorias = this.helper.organizaCategorias(tarefas)
        this.container.innerHTML = ''
        categorias.forEach(categoria => {

            let tarefas_por_categoria = tarefas.filter((tarefa) => 
                tarefa.categoria === categoria)

            let tarefaHTML = ''

            tarefas_por_categoria.forEach((tarefa) => {
                tarefaHTML += `
                <div class="tarefa" id="${tarefa.id}">
                <div class="note-header">
                <div class="note-titulo">
                ${tarefa.titulo} - ${this.helper.formataData(tarefa.data)}
                </div>
                <div class="${tarefa.feito ? 'note-feito' :  'note-nao-feito'} check"> 
                </div>
                </div>
                <div class="note-body">
                <div class="note-descricao">
                ${tarefa.descricao}
                </div>
                </div>
                <div class="note-foot">
                <button class="btn-editar">Editar</button>
                <button class="btn-apagar">Apagar</button>
                </div>
                </div>
                `
            })
            this.container.innerHTML += `
                <div class="container-tarefas">
                    <p class="titulo-categoria ${categoria}">${categoria}</p>
                    ${tarefaHTML}
                </div>
            `
        })
        
    }
}