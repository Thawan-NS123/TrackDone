<svelte:head>
    <title>Configurações da Conta</title>
    <link rel="stylesheet" href="config.css" />
</svelte:head>

<div class="main-container">
    <div class="container">
        <h1>Conta</h1>
        
        <div class="menu-container">
            <div class="menu-item" id="perfilItem" on:click={redirectToPerfil}>
                <div class="menu-icon">👤</div>
                <div class="menu-content">
                    <h2>Perfil</h2>
                    <p>Gerencie suas informações</p>
                </div>
                <div class="menu-arrow">›</div>
            </div>
            
            <div class="menu-divider"></div>
            
            <div class="menu-item" id="sairItem" on:click={handleLogout}>
                <div class="menu-icon">🚪</div>
                <div class="menu-content">
                    <h2>Sair</h2>
                    <p>Logout</p>
                </div>
                <div class="menu-arrow">›</div>
            </div>
        </div>
    </div>

    <!-- Tranformar o footer em componente -->
    <footer class="rodape">
        <nav class="menu">
            <a href="../main/main.html" class="item">
                <img src="../image/casa.svg" alt="home" />
            </a>
            <a href="https://calendar.google.com" target="_blank" class="item">
                <img src="../image/calendario.svg" alt="Calendário" />
            </a>
            <a href="../relatorios/relatorios.html" class="item">
                <img src="../image/relatorios.svg" alt="Relatórios" />
            </a>
            <a href="./config.html" class="item">
                <img src="../image/config.svg" alt="Configurações" />
            </a>
        </nav>
    </footer>
</div>

<script>
    function redirectToPerfil() {
        window.location.href = '../colaborador/colaborador.html';
    }
    
    function handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            window.location.href = '../login/login.html';
        }
    }
</script>