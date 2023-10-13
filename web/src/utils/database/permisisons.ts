import { Permission } from "@utils/interfaces";

export const permissions: Permission[] = [
  {
    name: "Administração",
    permissions: [
      {
        label: "admin",
        description: "Tem todas as permissões do sistema",
      },
      {
        label: "dashboard",
        description: "Permite que o usuário acesse a página do painel",
      },
    ],
  },
  {
    name: "Conta",
    permissions: [
      {
        label: "view_account",
        description: "Pode visualizar as informações da conta",
      },
      {
        label: "update_name",
        description: "Pode editar o nome da conta",
      },
      {
        label: "update_email",
        description: "Pode editar o e-mail da conta",
      },
      {
        label: "update_password",
        description: "Pode editar a senha da conta",
      },
    ],
  },
  {
    name: "Marcas",
    permissions: [
      {
        label: "brands",
        description: "Permite ver as marcas",
      },
      {
        label: "create_brand",
        description: "Permite criar uma marca",
      },
      {
        label: "update_brand",
        description: "Permite editar uma marca",
      },
      {
        label: "delete_brand",
        description: "Permite excluir uma marca",
      },
    ],
  },
  {
    name: "Modelos",
    permissions: [
      {
        label: "models",
        description: "Permite ver os modelos",
      },
      {
        label: "create_model",
        description: "Permite criar um modelo",
      },
      {
        label: "update_model",
        description: "Permite editar um modelo",
      },
      {
        label: "delete_model",
        description: "Permite excluir um modelo",
      },
    ],
  },
  {
    name: "Carros",
    permissions: [
      {
        label: "cars",
        description: "Permite ver os carros",
      },
      {
        label: "create_car",
        description: "Permite criar um carro",
      },
      {
        label: "update_car",
        description: "Permite editar um carro",
      },
      {
        label: "delete_car",
        description: "Permite excluir um carro",
      },
    ],
  },
  {
    name: "Grupos",
    permissions: [
      {
        label: "groups",
        description: "Permite ver os grupos",
      },
      {
        label: "create_group",
        description: "Permite criar um grupo",
      },
      {
        label: "update_group",
        description: "Permite editar um grupo",
      },
      {
        label: "delete_group",
        description: "Permite excluir um grupo",
      },
    ],
  },
  {
    name: "Usuários",
    permissions: [
      {
        label: "users",
        description: "Permite ver os usuários",
      },
      {
        label: "create_user",
        description: "Permite criar um usuário",
      },
      {
        label: "update_user",
        description: "Permite editar um usuário",
      },
      {
        label: "delete_user",
        description: "Permite excluir um usuário",
      },
    ],
  },
];
