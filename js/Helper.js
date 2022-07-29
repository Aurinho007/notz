export class Helper{

    formataData(data){
        let data_formatada = `${data.substring(8,data.length)}/${data.substring(5,7)}`
        return data_formatada
    }

    dataAmanhaTexto(){
        const dataAtual = new Date();

        const dataAmanhaFormatada =
             new Intl.DateTimeFormat('fr-CA')
                .format(dataAtual
                .setDate(
                    dataAtual.getDate() + 1)
                )

        return dataAmanhaFormatada
    }

    organizaCategorias(tarefas){

        let categorias = tarefas.map((tarefa) => tarefa.categoria)
        categorias =  [...new Set(categorias)];
        categorias.sort()

        if(categorias.includes('Outros')){
            categorias = categorias.filter(categoria => categoria != 'Outros')
            categorias.push('Outros')
        }

        return categorias
    }

}