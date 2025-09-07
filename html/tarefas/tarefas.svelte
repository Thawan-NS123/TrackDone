<script>
    let titulo = '';
    let descricao = '';
    let responsavel = '';
    let status = '';
    let dataEntrega = '';
    let prioridade = false;
    
    function criarTarefa() {
        if (!titulo.trim()) {
            alert('Por favor, informe o título da tarefa.');
            return;
        }
        
        alert('Tarefa criada com sucesso!');
        setTimeout(() => {
            window.location.href = '../main/main.html';
        }, 500);
    }
    
    function cancelar() {
        if (confirm('Deseja cancelar a criação da tarefa? Os dados não serão salvos.')) {
            setTimeout(() => {
                window.location.href = '../main/main.html';
            }, 500);
        }
    }
    
    function finalizarTarefa() {
        if (confirm('Deseja Finalizar a tarefa?')) {
            alert('Tarefa finalizada!');
            setTimeout(() => {
                window.location.href = '../main/main.html';
            }, 500);
        }
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        criarTarefa();
    }
</script>

<div class="container">
    <h1>Incluir Tarefa</h1>
    
    <form on:submit={handleSubmit}>
        <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" bind:value={titulo} placeholder="Digite o título da tarefa">
        </div>
        
        <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" bind:value={descricao} rows="4" placeholder="Digite a descrição da tarefa"></textarea>
        </div>
        
        <div class="form-group">
            <label for="responsavel">Responsável</label>
            <input type="text" id="responsavel" bind:value={responsavel} placeholder="Digite o nome do responsável">
        </div>
        
        <div class="form-group">
            <label for="status">Status</label>
            <select id="status" bind:value={status}>
                <option value="">Selecionar</option>
                <option value="pendente">Pendente</option>
                <option value="andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
            </select>
        </div>
        
        <div class="row">
            <div class="form-group">
                <label for="dataEntrega">Dt. Entrega</label>
                <input type="date" id="dataEntrega" bind:value={dataEntrega}>
            </div>
            
            <div class="form-group">
                <label for="prioridade">Prioridade</label>
                <div class="checkbox-container">
                    <input type="checkbox" id="prioridade" bind:checked={prioridade}>
                    <label for="prioridade" class="checkbox-label">É prioridade?</label>
                </div>
            </div>
        </div>
        
        <div class="form-actions">
           <button type="button" class="btn-finalizar" on:click={finalizarTarefa}>Finalizar</button> <!--  Só deve aparecer quando for uma alteração -->
            <div class="bts">
                <button type="submit" class="btn-criar">Criar</button>
                <button type="button" class="btn-cancelar" on:click={cancelar}>Cancelar</button>
            </div>
        </div>
    </form>
</div>