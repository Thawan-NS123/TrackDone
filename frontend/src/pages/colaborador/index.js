import { useState } from 'react';
import './index.css';

export default function CadastroColaborador() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    nascimento: '',
    genero: '',
    cargo: '',
    email: '',
    senha: '',
    repetirSenha: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Máscaras para telefone e CPF
  const aplicarMascaraTelefone = (value) => {
    let numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) numbers = numbers.slice(0, 11);
    
    if (numbers.length > 0) {
      numbers = numbers.replace(/^(\d{2})(\d)/g, '($1) $2');
      if (numbers.length > 10) {
        numbers = numbers.replace(/(\d{5})(\d)/, '$1-$2');
      }
    }
    
    return numbers;
  };

  const aplicarMascaraCPF = (value) => {
    let numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) numbers = numbers.slice(0, 11);
    
    if (numbers.length > 0) {
      numbers = numbers.replace(/(\d{3})(\d)/, '$1.$2');
      numbers = numbers.replace(/(\d{3})(\d)/, '$1.$2');
      numbers = numbers.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    return numbers;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // BOTANDO A MASCARA DO TELEFONE E DO CPF
    if (name === 'telefone') {
      processedValue = aplicarMascaraTelefone(value);
    } else if (name === 'cpf') {
      processedValue = aplicarMascaraCPF(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome.trim()) newErrors.nome = 'Por favor, informe o nome';
    if (formData.telefone.length < 14) newErrors.telefone = 'Telefone inválido';
    if (formData.cpf.length < 14) newErrors.cpf = 'CPF inválido';
    if (!formData.nascimento) newErrors.nascimento = 'Data inválida';
    if (!formData.genero) newErrors.genero = 'Selecione uma opção';
    if (!formData.cargo.trim()) newErrors.cargo = 'Informe o cargo';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Email inválido';
    if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.senha !== formData.repetirSenha) newErrors.repetirSenha = 'As senhas não coincidem';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      

      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h1>Cadastro de Colaborador</h1>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome" className="required">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            {errors.nome && <div className="error">{errors.nome}</div>}
          </div>
          
          <div className="row">
            <div className="form-group">
              <label htmlFor="telefone" className="required">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                required
              />
              {errors.telefone && <div className="error">{errors.telefone}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cpf" className="required">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
                required
              />
              {errors.cpf && <div className="error">{errors.cpf}</div>}
            </div>
          </div>
          
          <div className="row">
            <div className="form-group">
              <label htmlFor="nascimento" className="required">Data de Nascimento</label>
              <input
                type="date"
                id="nascimento"
                name="nascimento"
                value={formData.nascimento}
                onChange={handleInputChange}
                required
              />
              {errors.nascimento && <div className="error">{errors.nascimento}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="genero" className="required">Gênero</label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_informar">Prefiro não informar</option>
              </select>
              {errors.genero && <div className="error">{errors.genero}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="cargo" className="required">Cargo</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              required
            />
            {errors.cargo && <div className="error">{errors.cargo}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="required">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          
          <div className="row">
            <div className="form-group">
              <label htmlFor="senha" className="required">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
              {errors.senha && <div className="error">{errors.senha}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="repetirSenha" className="required">Repetir Senha</label>
              <input
                type="password"
                id="repetirSenha"
                name="repetirSenha"
                value={formData.repetirSenha}
                onChange={handleInputChange}
                required
              />
              {errors.repetirSenha && <div className="error">{errors.repetirSenha}</div>}
            </div>
          </div>
          
          <button type="submit">Salvar</button>
        </form>
      ) : (
        <div className="success-message">
          Cadastro realizado com sucesso! Redirecionando para login...
        </div>
      )}
      
      <div className="login-link">
        Já tem uma conta? <a href="/login" onClick={handleLoginRedirect}>Faça login</a>
      </div>
    </div>
  );
}