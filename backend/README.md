
# API Endpoints - TrackDone Backend

Como executar o ambiente de desenvolvimento

1. Certifique-se de ter uma versão recente do Node.js instalada.
2. No terminal, esteja no diretório raiz.
3. Execute os comandos abaixo:

```bash
npm install           # Instala as dependências
npm run start:database # Realiza a criação do banco de dados localmente e inicia as tabelas.
npm run start:api     # Inicia a API Fastify
```

## Tecnologias utilizadas

- **TypeScript**
- **Fastify**
- **Prisma**
- **SQLite**
- **Biome** (linter e formatter)

> Recomenda-se instalar a extensão do Biome para VS Code: [Biome Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)


## Entidades

### Usuário
Representa uma pessoa cadastrada no sistema, responsável por tarefas.
- `id`: identificador único
- `name`: nome
- `phone`: telefone
- `cpf`: CPF
- `birthDate`: data de nascimento
- `gender`: gênero
- `position`: cargo
- `email`: email
- `tasks`: lista de tarefas vinculadas

### Tarefa (Task)
Representa uma atividade atribuída a um usuário.
- `id`: identificador único
- `title`: título
- `description`: descrição
- `responsible`: nome do responsável
- `status`: status da tarefa
- `dueDate`: data de entrega
- `priority`: prioridade
- `idResponsible`: id do usuário responsável FK (Foreign Key)

---

## Endpoints de Usuário

### Criar usuário
- **POST** `/user`
#### Body exemplo:
```json
{
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "password": "senha123"
}
```
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z"
}
```

### Autenticar usuário
- **POST** `/user/autenticar`
#### Body exemplo:
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z"
}
```

### Atualizar usuário
- **PUT** `/user/:id`
#### Body exemplo:
```json
{
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "password": "novaSenha"
}
```
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z"
}
```

### Listar todos os usuários
- **GET** `/user`
#### Retorno em caso de sucesso:
```json
[
  {
    "id": "uuid-gerado",
    "name": "João Silva",
    "phone": "11999999999",
    "cpf": "12345678900",
    "birthDate": "1990-01-01T00:00:00.000Z",
    "gender": "masculino",
    "position": "Desenvolvedor",
    "email": "joao@email.com",
    "createdAt": "2025-09-03T12:00:00.000Z",
    "updatedAt": "2025-09-03T12:00:00.000Z",
    "tasks": [ /* array de tarefas */ ]
  }
]
```

### Buscar usuário por id
- **GET** `/user/:id`
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "gender": "masculino",
  "position": "Desenvolvedor",
  "email": "joao@email.com",
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "tasks": [ /* array de tarefas */ ]
}
```

### Buscar usuário com mais tarefas
- **GET** `/user/most-tasks`
#### Retorno em caso de sucesso:
```json
[
  {
    "id": "uuid-gerado",
    "name": "João Silva",
    "taskCount": 5,
    "tasks": [ /* array de tarefas */ ]
  }
]
```

---

## Endpoints de Tarefa

### Criar tarefa
- **POST** `/task`
#### Body exemplo:
```json
{
  "title": "Implementar autenticação",
  "description": "Criar endpoint de login",
  "responsible": "João Silva",
  "status": "pendente",
  "dueDate": "2025-09-10",
  "priority": true,
  "idResponsible": "id-do-usuario"
}
```
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "title": "Implementar autenticação",
  "description": "Criar endpoint de login",
  "responsible": "João Silva",
  "status": "pendente",
  "dueDate": "2025-09-10T00:00:00.000Z",
  "priority": true,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "idResponsible": "id-do-usuario"
}
```

### Atualizar tarefa
- **PUT** `/task/:id`
#### Body exemplo:
```json
{
  "title": "Implementar autenticação",
  "description": "Atualizar endpoint de login",
  "responsible": "João Silva",
  "status": "concluída",
  "dueDate": "2025-09-12",
  "priority": false,
  "idResponsible": "id-do-usuario"
}
```
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "title": "Implementar autenticação",
  "description": "Atualizar endpoint de login",
  "responsible": "João Silva",
  "status": "concluída",
  "dueDate": "2025-09-12T00:00:00.000Z",
  "priority": false,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "idResponsible": "id-do-usuario"
}
```

### Excluir tarefa
- **DELETE** `/task/:id`
#### Retorno em caso de sucesso:
```json
{
  "message": "Tarefa excluída com sucesso."
}
```

### Listar todas as tarefas (com filtros opcionais)
- **GET** `/task`
#### Parâmetros opcionais:
- `idResponsible`: filtra por usuário responsável
- `dataInicial` e `dataFinal`: filtra por período de criação
- `status`: filtra por status
#### Retorno em caso de sucesso:
```json
[
  {
    "id": "uuid-gerado",
    "title": "Implementar autenticação",
    "description": "Criar endpoint de login",
    "responsible": "João Silva",
    "status": "pendente",
    "dueDate": "2025-09-10T00:00:00.000Z",
    "priority": true,
    "createdAt": "2025-09-03T12:00:00.000Z",
    "updatedAt": "2025-09-03T12:00:00.000Z",
    "idResponsible": "id-do-usuario"
  }
]
```

### Buscar tarefa por id
- **GET** `/task/:id`
#### Retorno em caso de sucesso:
```json
{
  "id": "uuid-gerado",
  "title": "Implementar autenticação",
  "description": "Criar endpoint de login",
  "responsible": "João Silva",
  "status": "pendente",
  "dueDate": "2025-09-10T00:00:00.000Z",
  "priority": true,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "idResponsible": "id-do-usuario"
}
```

---
Informações relevantes:
- Uma tarefa apenas é criada se o idResponsible da tabela User estiver presente.
- Ao realizar o envio de datas, o que está sendo utilizado é a função Date() do Typescript, ele aceita o padrão YYYY-MM-DD ou 2025-09-03T12:00:00.000Z

> Todos os endpoints retornam os dados em formato JSON.
