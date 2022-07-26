export class Controller {

    adicionaTarefa(tarefa){

        fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        }).then(res => res.json())
    }

    atualizaTarefa(tarefa){
        fetch("http://localhost:3000/tarefas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        }).then(res => res.json())

        this.atualizaLocalStorage()

    }

    removeTarefa(id){
        fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())

        this.atualizaLocalStorage()
    }

    populaServerJSON(){
        let tarefas = localStorage.getItem('tarefas')
        tarefas = JSON.parse(tarefas)

        tarefas.forEach(tarefa => {

            delete tarefa.id

            fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        }).then(res => res.json())
        })
        
    }

    async listasTarefas(){
        return await fetch('http://localhost:3000/tarefas')
            .then(res => res.json())
            .then(tarefas => tarefas)
    }

    async atualizaLocalStorage(){
        let tarefas = await fetch('http://localhost:3000/tarefas')
            .then(res => res.json())
            .then(tarefas => tarefas)
        
        localStorage.clear()

        localStorage.setItem('tarefas', JSON.stringify(tarefas))

    }

}