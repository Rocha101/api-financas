# API Finanças

Uma API RESTful para gerenciamento de finanças pessoais, construída com Node.js, TypeScript, e Prisma.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- Node.js
- TypeScript
- Prisma (ORM)
- Docker
- PostgreSQL

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Node.js (versão 14 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositório]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis necessárias

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🛠️ Desenvolvimento

Para desenvolvimento, o projeto utiliza:
- `nodemon` para auto-reload
- `eslint` e `prettier` para formatação de código
- `typescript` para tipagem estática

## 📦 Estrutura do Projeto

```
src/
  ├── controllers/   # Controladores da aplicação
  ├── middlewares/   # Middlewares personalizados
  ├── routes/        # Rotas da API
  ├── services/      # Lógica de negócios
  └── utils/         # Utilitários e helpers
```

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).