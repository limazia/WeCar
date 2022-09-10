# Permissões do WeCar

### Grupo de permissoes

```
admin: Tem todas as permissões do sistema
login_admin: Permite que o usuário acesse a página do painel

brands: Permite ver as marcas
view_brand: Permite visualizar uma página de marca
create_brand: Permite criar uma marca
edit_brand: Permite editar uma marca
delete_brand: Permite excluir uma marca

models: Permite ver os modelos
view_model: Permite visualizar uma página de modelo
create_model: Permite criar um modelo
edit_model: Permite editar um modelo
delete_model: Permite excluir um modelo

cars: Permite ver os carros
view_car: Permite visualizar uma página de carro
create_car: Permite criar um carro
edit_car: Permite editar um carro
delete_car: Permite excluir um carro

users: Permite ver os usuários
view_user: Permite visualizar uma página de usuário
create_user: Permite criar um usuário
edit_user: Permite editar um usuário
delete_user: Permite excluir um usuário
```

### Exemplo de retorno

```
username: [{
    name: "Acacio de Lima",
    permissions: ["brands", "edit_brand", "cars", "delete_car"]
}]
```