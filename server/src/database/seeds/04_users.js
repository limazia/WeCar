exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: "0361ddbbcc92022",
      name: "Acacio de Lima",
      email: "limadeacacio@gmail.com",
      password: "$2b$10$/HR6ESB8JitGblj4N5AgqeY6jxqifHfxYn//IUxYVLhgEeNCYugsm", // 1234
      permissions: "all",
    },
  ]);
};
