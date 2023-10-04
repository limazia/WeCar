## ✨ Instalação

* WeCar requer [Node.js](https://nodejs.org/) v10+ para execução.
* Configure a conexão com seu banco de dados.

1. Trocar o nome do arquivo `.env.exemple` para `.env`

2. Coloque os valores das variavés de ambiente no arquivo `.env`
   ```js
   # App
   NODE_ENV="development"
   APP_PORT=3333

   # MySQL
   DATABASE_DRIVE="mysql"
   DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"

   # JWT
   JWT_TOKEN="SUA_CHAVE"

   ```

3. Instalar as dependências
   ```sh
   npm install ou yarn

   ```

## 📝 Como Usar

1. Executar como desenvolvimento
   ```
   cd wecar
   cd server
   npm run knex:migrate
   npm run knex:seed
   npm run dev
   ```
2. Executar em produção
   ```
   cd wecar
   cd server
   npm run knex:migrate
   npm run build
   npm start
   ```

## License

MIT
