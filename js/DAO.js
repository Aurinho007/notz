export class  DAO{

    async adicionaTarefa(nova_tarefa){
        let tarefas = this.listarTarefas()
        tarefas.push(nova_tarefa)
        this.atualizaLocalStorage(tarefas)

        //apenas na versão com json
       // await this.adicionaTarefaServerJSON(nova_tarefa)
    }

    async removeTarefa(id){
        let tarefas = this.listarTarefas()
        let tarefas_atualizada = tarefas.filter((tarefa) => tarefa.id != id)
        this.atualizaLocalStorage(tarefas_atualizada)

        //apenas na versão com json
       // await this.removeTarefaServerJSON(id)


    }

    async atualizaTarefa(tarefa){
        this.removeTarefa(tarefa.id)
        this.adicionaTarefa(tarefa)

        //apenas na versão com json
       // await this.atualizaTarefaServerJSON(tarefa)
    }

    listarTarefas(){
        let tarefas = localStorage.getItem('tarefas')
        tarefas = JSON.parse(tarefas)
        return tarefas
    }

    buscaPorId(id){
        let tarefas = this.listarTarefas()
        let tarefa_filtrada = tarefas.filter((tarefa) => tarefa.id === id )
        return tarefa_filtrada[0]
    }
    
    atualizaLocalStorage(tarefas){
        localStorage.clear()
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    getId(){

        let tarefas = this.listarTarefas()

        if(!tarefas.length) return 1

        let maior_id = 0

        tarefas.forEach((tarefa) => {
            if(parseInt(tarefa.id) > maior_id) maior_id = parseInt(tarefa.id)
        })

        return ++maior_id
    }

    atualizaCheck(id){
        let tarefas = this.listarTarefas()
 
        tarefas.filter(tarefa => {
            if(tarefa.id === id){
                tarefa.feito = !tarefa.feito
                } 
            })
        
        this.atualizaLocalStorage(tarefas)
     }
     
    //Métodos do JSON Server

    async adicionaTarefaServerJSON(tarefa){

        delete tarefa.id

        await fetch("http://localhost:3000/tarefas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarefa)
            }).then(res => res.json())  
    }

    async removeTarefaServerJSON(id){

        await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
    }

    async atualizaTarefaServerJSON(tarefa){

        await fetch("http://localhost:3000/tarefas", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarefa)
            }).then(res => res.json())
    }

    

}

    
