## ✨ Instalação

* WeCar requer [Node.js](https://nodejs.org/) v10+ e [Vite](https://vitejs.dev/) para execução.

1. Trocar o nome do arquivo `.env.exemple` para `.env`
2. Crie uma conta no [EmailJS](https://www.emailjs.com/) e siga este tutorial "[Enviar email em formulário com React JS de uma forma simples](https://www.youtube.com/watch?v=Zbg1BHOVzRg)"
3. Coloque os valores das variavés de ambiente no arquivo `.env`
   ```js
   # App
   VITE_APP_NAME="WeCar"
   VITE_APP_ENV="development"
   VITE_APP_URL="http://localhost:5173"

   # API
   VITE_API_URL="http://localhost:3333"

   # EmailJS
   VITE_EMAILJS_SERVICE_KEY=
   VITE_EMAILJS_PUBLIC_KEY=
   VITE_EMAILJS_TEMPLATE_ID=

   # Social
   VITE_PHONE_NUMBER="551999999999"
   VITE_FACEBOOK_URL="https://www.facebook.com/"
   VITE_INSTAGRAM_URL="https://www.instagram.com/"
   ```
4. Instalar as dependências
   ```sh
   npm install ou yarn
   ```

## 📝 Como Usar

1. Executar como desenvolvimento
   ```
   cd wecar
   cd web
   npm run dev
   ```
2. Executar em produção

    ```
    cd wecar
    cd server
    npm run build
    ```

## License
MIT
