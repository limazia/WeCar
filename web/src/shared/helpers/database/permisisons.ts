import { Permission } from "@shared/interfaces";

export const permissions: Permission[] = [
  {
    name: "Administração",
    permissions: [
      {
        label: "admin",
        description: "Possui todas as permissões do sistema.",
      },
      {
        label: "dashboard",
        description: "Permite acesso à página do painel de controle.",
      },
    ],
  },
  {
    name: "Grupos",
    permissions: [
      {
        label: "groups.list",
        description: "Permite visualizar a lista de grupos disponíveis.",
      },
      {
        label: "groups.create",
        description: "Permite criar um novo grupo.",
      },
      {
        label: "groups.update",
        description: "Permite editar informações de um grupo existente.",
      },
      {
        label: "groups.delete",
        description: "Permite excluir um grupo existente.",
      },
    ],
  },
  {
    name: "Configurações",
    permissions: [
      {
        label: "settings.view",
        description: "Permite visualizar as configurações do sistema.",
      },
      {
        label: "settings.update",
        description: "Permite editar as configurações do sistema.",
      },
    ],
  },
  {
    name: "Conta",
    permissions: [
      {
        label: "view.account",
        description: "Permite visualização das informações da conta.",
      },
      {
        label: "update.name",
        description: "Permite editar o nome associado à conta.",
      },
      {
        label: "update.email",
        description: "Permite editar o endereço de e-mail associado à conta.",
      },
      {
        label: "update.password",
        description: "Permite editar a senha associada à conta.",
      },
    ],
  },
  {
    name: "Marcas",
    permissions: [
      {
        label: "brands.list",
        description: "Permite visualizar a lista de marcas disponíveis.",
      },
      {
        label: "brands.create",
        description: "Permite criar uma nova marca.",
      },
      {
        label: "brands.update",
        description: "Permite editar informações de uma marca existente.",
      },
      {
        label: "brands.delete",
        description: "Permite excluir uma marca existente.",
      },
    ],
  },
  {
    name: "Modelos",
    permissions: [
      {
        label: "models.list",
        description: "Permite visualizar a lista de modelos disponíveis.",
      },
      {
        label: "models.create",
        description: "Permite criar um novo modelo de carro.",
      },
      {
        label: "models.update",
        description: "Permite editar informações de um modelo existente.",
      },
      {
        label: "models.delete",
        description: "Permite excluir um modelo existente.",
      },
    ],
  },
  {
    name: "Carros",
    permissions: [
      {
        label: "cars.list",
        description: "Permite visualizar a lista de carros disponíveis.",
      },
      {
        label: "cars.create",
        description: "Permite adicionar um novo carro à lista.",
      },
      {
        label: "cars.update",
        description: "Permite editar informações de um carro existente.",
      },
      {
        label: "cars.delete",
        description: "Permite excluir um carro existente.",
      },
    ],
  },

  {
    name: "Usuários",
    permissions: [
      {
        label: "users.list",
        description: "Permite visualizar a lista de usuários registrados.",
      },
      {
        label: "users.create",
        description: "Permite criar um novo usuário.",
      },
      {
        label: "users.update",
        description: "Permite editar informações de um usuário existente.",
      },
      {
        label: "users.delete",
        description: "Permite excluir um usuário existente.",
      },
    ],
  },
];
