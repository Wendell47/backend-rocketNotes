const UserCreateService = require("./UserCreateService"); 
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");


describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;
  
  // será executado antes de cada teste ser executado
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });
  
  it("user should be created", async () => {
    // nao queremos depender do usuario criar um usuario
    // entao vamos criar um usuario
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
    
    const userCreated = await userCreateService.execute(user);
  
    // verifica se useCreated Possui a propriedade id
    expect(userCreated).toHaveProperty("id");
  });

  it("user must not be created with an existing email", async () => {
    // criar um usuario
    const user1 = {
      name: "User Test 1",
      email: "user@text.com",
      password: "123"
    };

    // criar segundo usuario com mesmo email
    const user2 = {
      name: "User Test 2",
      email: "user@text.com",
      password: "456"
    };

    // criar usuario 1
    const userResult = await userCreateService.execute(user1);
    console.log(userResult)
    // tentar criar usuario 2 
    // espera gerar um erro 
    // igual ao AppError
    // nao esquecer de importar AppError
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
});
