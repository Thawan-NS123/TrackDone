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
    repetirSenha: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    if (name === 'telefone') {
      processedValue = aplicarMascaraTelefone(value);
    } else if (name === 'cpf') {
      processedValue = aplicarMascaraCPF(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const body = {
          name: formData.nome,
          email: formData.email,
          password: formData.senha,
          position: formData.cargo,
          gender: formData.genero,
          birthDate: formData.nascimento,
          cpf: formData.cpf,
          phone: formData.telefone,
        };

        const res = await fetch('http://localhost:8080/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Erro ao cadastrar colaborador');
        }

        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  return (
    <main className="container">
      <h1>Cadastro de Colaborador</h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome" className="required">
              Nome
            </label>
            <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
            {errors.nome && <div className="error">{errors.nome}</div>}
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="telefone" className="required">
                Telefone
              </label>
              <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
              {errors.telefone && <div className="error">{errors.telefone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="cpf" className="required">
                CPF
              </label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
              {errors.cpf && <div className="error">{errors.cpf}</div>}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="nascimento" className="required">
                Nascimento
              </label>
              <input type="date" name="nascimento" value={formData.nascimento} onChange={handleInputChange} required />
              {errors.nascimento && <div className="error">{errors.nascimento}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="genero" className="required">
                Gênero
              </label>
              <select name="genero" value={formData.genero} onChange={handleInputChange} required>
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
            <label htmlFor="cargo" className="required">
              Cargo
            </label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
            {errors.cargo && <div className="error">{errors.cargo}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="required">
              Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="senha" className="required">
                Senha
              </label>
              <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} required />
              {errors.senha && <div className="error">{errors.senha}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="repetirSenha" className="required">
                Repetir Senha
              </label>
              <input
                type="password"
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
        <div className="success-message">✅ Cadastro realizado com sucesso! Redirecionando para login...</div>
      )}

      <div className="login-link">
        Já tem uma conta?{' '}
        <a href="/login" onClick={handleLoginRedirect}>
          Faça login
        </a>
      </div>
    </main>
  );
}
