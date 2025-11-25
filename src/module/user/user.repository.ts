export const UserRepository = {
  findAll() {
    return [{ id: 1, name: "Caio" }];
  },

  findById(id: number) {
    return { id, name: "Usuário específico" };
  },

  create(data: any) {
    return { id: Date.now(), ...data };
  }
};
