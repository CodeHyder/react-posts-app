# CodeLeap Network - Frontend

Frontend do desafio técnico proposto pela CodeLeap, desenvolvido com **React** + **TailwindCSS**.
A aplicação permite que usuários publiquem, editem e excluam posts de forma simples e responsiva.
Esta aplicação consome a [API Python-Challenge](https://python-challenge-8guz.onrender.com), também desenvolvida por mim e o código pode ser encontrado [nesse repositorio.](https://github.com/CodeHyder/Python-Challenge)
Você pode conferir o deploy da aplicação [nesse link](react-posts-app-dun.vercel.app)

---

## 📌 Funcionalidades

- ✅ Login por nome de usuário (sem autenticação real)
- ✅ Listagem de posts públicos
- ✅ Criação de posts
- ✅ Edição e exclusão de posts (apenas pelo autor)
- ✅ Responsividade adaptativa (Mobile, Tablet, Desktop)
- ✅ Feedback visual (botões desativados, hover, etc.)
- ✅ Armazenamento de sessão via Local Storage
- ✅ Estrutura de componentes reutilizáveis
- 🔲Likes
- 🔲Mentions
- 🔲Comments
- 🔲Media attachments

---

## 🧱 Tecnologias

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query (TanStack)](https://tanstack.com/query) para gerenciamento de dados
- [React Context API](https://reactjs.org/docs/context.html) para controle do usuário
- [Vite](https://vitejs.dev/) para build e dev server

---

## 📁 Estrutura de Pastas

```bash
src/
│
├── assets/             
├── components/        
├── context/     
├── hooks/           
├── pages/    
├── App.jsx              
└── main.jsx             
```

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Clone o repositório

```bash
git clone https://github.com/CodeHyder/react-posts-app.git
```

### Instale as dependências

```bash
cd react-posts-app
npm install
```

### Rode o projeto

```bash
npm run dev
```

## 🛠️ Melhorias Técnicas Futuras

### 🔧 Arquitetura & Estrutura

- Separar rotas por meio de React Router para facilitar escalabilidade em múltiplas páginas.
- Criação de uma camada de services/adapters para abstração da API externa, permitindo troca de backend sem alterar os componentes.
- Implementação de Login com senha e autenticação com JWT

### 🎯 Qualidade de Código

- Escrita de testes unitários e de integração com React Testing Library ou Vitest, priorizando componentes críticos (PostCard, Modal, etc).

- Uso de TypeScript para adicionar tipagem estática e prevenir erros em tempo de desenvolvimento.

### ♿ Acessibilidade e UX

- Tratamento global de erros da API com react-query para melhorar feedback ao usuário.

### 🚀 CI/CD & Deploy

- Automatização com CI (GitHub Actions) para rodar lint, testes e build a cada push.

## Autor

Raphael — Desenvolvedor Full Stack

🌍 [LinkedIn](https://www.linkedin.com/in/raphael-rodrigues-85ab69168/)
