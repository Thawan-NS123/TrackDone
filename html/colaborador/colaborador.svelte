<script>
    
    let nome = '';
    let telefone = '';
    let cpf = '';
    let nascimento = '';
    let genero = '';
    let cargo = '';
    let email = '';
    let senha = '';
    let repetirSenha = '';
    
    let nomeError = false;
    let telefoneError = false;
    let cpfError = false;
    let nascimentoError = false;
    let generoError = false;
    let cargoError = false;
    let emailError = false;
    let senhaError = false;
    let repetirSenhaError = false;
    
    let cadastroSucesso = false;
    
    // Fromatando o Telefone
    function formatarTelefone(valor) {
        let value = valor.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length > 10) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
        }
        
        return value;
    }
    
    // Formatando o CPF
    function formatarCPF(valor) {
        let value = valor.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        
        return value;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validando Nome
        nomeError = !nome.trim();
        if (nomeError) isValid = false;
        
        // Validando Telefone
        telefoneError = telefone.replace(/\D/g, '').length < 11;
        if (telefoneError) isValid = false;
        
        // Validando CPF
        cpfError = cpf.replace(/\D/g, '').length < 11;
        if (cpfError) isValid = false;
        
        // Validando Data de Nascimento
        nascimentoError = !nascimento;
        if (nascimentoError) isValid = false;
        
        // Validando Gênero
        generoError = !genero;
        if (generoError) isValid = false;
        
        // Validando Cargo
        cargoError = !cargo.trim();
        if (cargoError) isValid = false;
        
        // Validando Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailError = !emailRegex.test(email);
        if (emailError) isValid = false;
        
        // Validando Senha
        senhaError = senha.length < 6;
        if (senhaError) isValid = false;
        
        // Validando Confirmação de Senha
        repetirSenhaError = senha !== repetirSenha;
        if (repetirSenhaError) isValid = false;
        
        if (isValid) {
            cadastroSucesso = true;
            
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 500);
        }
    }
    
    function irParaLogin() {
        window.location.href = '../login/login.html';
    }
</script>

<div class="container">
    <h1>Cadastro de Colaborador</h1>
    
    {#if cadastroSucesso}
        <div class="success-message">
            Cadastro realizado com sucesso! Redirecionando para login...
        </div>
    {:else}
        <form on:submit={handleSubmit}>
            <div class="form-group">
                <label for="nome" class="required">Nome</label>
                <input 
                    type="text" 
                    id="nome" 
                    bind:value={nome}
                    class:error={nomeError}
                    required
                />
                {#if nomeError}
                    <div class="error">Por favor, informe o nome</div>
                {/if}
            </div>
            
            <div class="row">
                <div class="form-group">
                    <label for="telefone" class="required">Telefone</label>
                    <input 
                        type="tel" 
                        id="telefone" 
                        bind:value={telefone}
                        on:input={(e) => telefone = formatarTelefone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        class:error={telefoneError}
                        required
                    />
                    {#if telefoneError}
                        <div class="error">Telefone inválido</div>
                    {/if}
                </div>
                
                <div class="form-group">
                    <label for="cpf" class="required">CPF</label>
                    <input 
                        type="text" 
                        id="cpf" 
                        bind:value={cpf}
                        on:input={(e) => cpf = formatarCPF(e.target.value)}
                        placeholder="000.000.000-00"
                        class:error={cpfError}
                        required
                    />
                    {#if cpfError}
                        <div class="error">CPF inválido</div>
                    {/if}
                </div>
            </div>
            
            <div class="row">
                <div class="form-group">
                    <label for="nascimento" class="required">Data de Nascimento</label>
                    <input 
                        type="date" 
                        id="nascimento" 
                        bind:value={nascimento}
                        class:error={nascimentoError}
                        required
                    />
                    {#if nascimentoError}
                        <div class="error">Data inválida</div>
                    {/if}
                </div>
                
                <div class="form-group">
                    <label for="genero" class="required">Gênero</label>
                    <select 
                        id="genero" 
                        bind:value={genero}
                        class:error={generoError}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                        <option value="nao_informar">Prefiro não informar</option>
                    </select>
                    {#if generoError}
                        <div class="error">Selecione uma opção</div>
                    {/if}
                </div>
            </div>
            
            <div class="form-group">
                <label for="cargo" class="required">Cargo</label>
                <input 
                    type="text" 
                    id="cargo" 
                    bind:value={cargo}
                    class:error={cargoError}
                    required
                />
                {#if cargoError}
                    <div class="error">Informe o cargo</div>
                {/if}
            </div>
            
            <div class="form-group">
                <label for="email" class="required">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    bind:value={email}
                    class:error={emailError}
                    required
                />
                {#if emailError}
                    <div class="error">Email inválido</div>
                {/if}
            </div>
            
            <div class="row">
                <div class="form-group">
                    <label for="senha" class="required">Senha</label>
                    <input 
                        type="password" 
                        id="senha" 
                        bind:value={senha}
                        class:error={senhaError}
                        required
                    />
                    {#if senhaError}
                        <div class="error">Senha deve ter pelo menos 6 caracteres</div>
                    {/if}
                </div>
                
                <div class="form-group">
                    <label for="repetirSenha" class="required">Repetir Senha</label>
                    <input 
                        type="password" 
                        id="repetirSenha" 
                        bind:value={repetirSenha}
                        class:error={repetirSenhaError}
                        required
                    />
                    {#if repetirSenhaError}
                        <div class="error">As senhas não coincidem</div>
                    {/if}
                </div>
            </div>
            
            <button type="submit">Salvar</button>
        </form>
    {/if}
    
    <div class="login-link">
        Já tem uma conta? <a href="#" on:click|preventDefault={irParaLogin}>Faça login</a>
    </div>
</div>