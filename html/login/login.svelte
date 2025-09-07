<script>
  let email = '';
  let password = '';
  let isLoading = false;
  let errorMessage = '';

  function handleLogin() {
      // Validação básica
      if (!email || !password) {
          errorMessage = 'Por favor, preencha todos os campos';
          return;
      }

      isLoading = true;
      errorMessage = '';

      // Simulação de login (sem backend)
      setTimeout(() => {
          isLoading = false;
          alert('Login realizado com sucesso!');
      }, 1500);
  }

  function handleRegister() {
      // Redirecionamento para cadastro
      window.location.href = '/cclaborador';
  }
</script>

<div class="container">
  <div class="logo">
      <img src="../Image/logoTrackDone.svg" alt="logo">
      <h1>Track<span>Done</span></h1>
      <p>Organize suas tarefas com eficiência</p>
  </div>
  
  <div class="login-form">
      <h2>Acesse sua conta</h2>
      
      {#if errorMessage}
          <div class="error-message">
              {errorMessage}
          </div>
      {/if}
      
      <div class="input-group">
          <label for="email">Email</label>
          <input 
              type="email" 
              id="email" 
              class="input-field" 
              placeholder="Seu endereço de email"
              bind:value={email}
              disabled={isLoading}
          />
      </div>
      
      <div class="input-group">
          <label for="password">Senha</label>
          <input 
              type="password" 
              id="password" 
              class="input-field" 
              placeholder="Sua senha"
              bind:value={password}
              disabled={isLoading}
          />
      </div>
      
      <div class="button-group">
          <button 
              class="btn btn-login" 
              on:click={handleLogin}
              disabled={isLoading}
          >
              {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <button 
              class="btn btn-register" 
              on:click={handleRegister}
              disabled={isLoading}
          >
              Cadastrar
          </button>
      </div>
  </div>
  
  <div class="footer">
      <p>© 2025 TrackDone - Todos os direitos reservados</p>
  </div>
</div>