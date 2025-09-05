# 🏋️‍♂️ GymBro – App de Treinos com Autenticação JWT

Aplicação **fullstack** moderna direcionada ao utilizador final para **criação, gestão e acompanhamento de treinos de ginásio**.  
O utilizador pode criar treinos a partir de exercícios já existentes na base de dados, definir **séries, repetições e pesos**, além de gerir a sua conta de forma segura com **autenticação JWT** e recuperação de palavra-passe via **OTP por email**.

---

## 🚀 Funcionalidades

- ✅ Criação de treinos personalizados com séries, repetições e pesos  
- ✅ Base de dados com exercícios já disponíveis  
- ✅ Listagem de todos os treinos criados pelo utilizador  
- ✅ Edição e eliminação de treinos  
- ✅ Edição de perfil e conta  
- ✅ Eliminação de conta  
- ✅ Recuperação de palavra-passe via email (OTP)  
- ✅ Autenticação JWT com cookies **HTTP-only** para maior segurança  

---

## 🧰 Tecnologias Utilizadas

### 📱 Mobile (`/mobile`)
- **Expo + React Native (TypeScript)**
- React Navigation  
- Axios (comunicação com backend)  
- Context API (gestão de estado/autenticação)

> ⚠️ **Nota:** o app mobile **só funciona em simulador** (Android/iOS). Não é suportado em dispositivo físico.

### 🖥️ Backend (`/server`)
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT  
- BcryptJS  
- Cookie Parser  
- Nodemailer (envio de emails OTP via SMTP)  
- Dotenv

---

## 🔐 Autenticação com JWT

- Após login, o backend gera um token JWT assinado com `JWT_SECRET`.  
- O token é guardado em **cookie HTTP-only**.  
- Um *middleware* no backend valida o token em rotas protegidas.  
- O cliente (mobile) envia o cookie automaticamente nas requisições.

---

## 📦 Instalação e Execução

### 1) Clonar o repositório
```bash
git clone https://github.com/HugoSpecial/GymBro.git
cd GymBro
```

### 2) Backend (`/server`)
```bash
cd server
npm install
```

Criar um ficheiro **`.env`** na pasta `/server` com o seguinte conteúdo (substitua pelos seus valores reais):

```env
# Porta onde o backend irá correr
PORT=4000

# URL de conexão MongoDB Atlas ou local
MONGODB_URI=mongodb+srv://<utilizador>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority

# JWT (JSON Web Token)
JWT_SECRET=sua_chave_super_secreta
JWT_EXPIRATION=7d

# Ambiente
NODE_ENV=development

# Configuração de Email (SMTP)
EMAIL_HOST=smtp.seuprovedor.com
EMAIL_PORT=587
SMTP_USER=seu_utilizador_smtp
SMTP_PASSWORD=sua_senha_smtp
SENDER_EMAIL=seuemail@dominio.com

# URL do cliente (mobile) – use a origem onde o app corre
CLIENT_URL=http://127.0.0.1:4000
```

Executar o servidor:
```bash
npm run server
# ou
npm start
```

### 3) Mobile (`/mobile`)
```bash
cd ../mobile
npm install
```

Iniciar a aplicação mobile com **Expo**:
```bash
npx expo start
```

> ⚠️ **Importante:** o projeto **só funciona em simuladores (Android/iOS)**.

---

## 🧪 Pré-requisitos

- Node.js **v18+**  
- MongoDB Atlas (ou servidor MongoDB local)  
- Conta de email com suporte a **SMTP** (ex.: Brevo, Gmail, etc.)  
- Android Studio (AVD) ou Xcode (Simulator) para correr o **simulador**

---

## 📸 Screenshots / Demonstração

Adicione aqui imagens para ilustrar as principais funcionalidades.

Sugestões:
- Tela de Login  
- Listagem de Treinos  
- Criação de Treino  
- Perfil do Utilizador  

Exemplo de inclusão (coloque as imagens em `./screenshots`):

```markdown
![Tela de Login](./screenshots/login.png)
![Lista de Treinos](./screenshots/workouts.png)
```

---

## 📄 Licença

Este projeto é apenas para fins de aprendizado.

---

## 👤 Autor

**Hugo Especial**
