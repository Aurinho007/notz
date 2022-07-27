export class Controller {

    listarTarefas(){
        let tarefas = localStorage.getItem('tarefas')
        tarefas = JSON.parse(tarefas)
        return tarefas
    }

    adicionaTarefa(nova_tarefa){
        let tarefas = this.listarTarefas()
        tarefas.push(nova_tarefa)
        this.atualizaLocalStorage(tarefas)

        //apenas na versão com json
        this.adicionaTarefaServerJSON(nova_tarefa)
    }

    removeTarefa(id){
        let tarefas = this.listarTarefas()
        let tarefas_atualizada = tarefas.filter((tarefa) => tarefa.id != id)
        this.atualizaLocalStorage(tarefas_atualizada)

        //apenas na versão com json
        this.removeTarefaServerJSON(id)


    }
    
    atualizaTarefa(tarefa){
        this.removeTarefa(tarefa.id)
        this.adicionaTarefa(tarefa)

        //apenas na versão com json
        this.atualizaTarefaServerJSON(tarefa)
    }

    atualizaLocalStorage(tarefas){
        localStorage.clear()
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    getId(){
        let id = this.listarTarefas().length
        return id++
    }

    //Métodos do JSON Server

    adicionaTarefaServerJSON(tarefa){

        delete tarefa.id

        fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        }).then(res => res.json())  
    }

    removeTarefaServerJSON(id){

        fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
    }

    atualizaTarefaServerJSON(tarefa){

        fetch("http://localhost:3000/tarefas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        }).then(res => res.json())
    }

}

    
