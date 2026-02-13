import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import prisma from "../prisma";
import { UserRepository } from "./user.repository";
export const EmployeeRepository = {
  async createEmployee(userDto: UserCreateDTO) {

    if (!userDto.employee) {
        throw new Error("EmployeeDTO is required to create an employee"); //depois personalizar os erros
    }

    const user = await UserRepository.create(userDto);

    return prisma.employee.create({
      data: {
        employeeType: userDto.employee.employeeType,
        user: {
          connect: { cpf: userDto.cpf }, // liga com o user criado no UserRepository
        },
      },
    include: { user: true}

    });
  },

  async updateEmployee(cpf: string, userDto: UserPutDTO) {


    const user = await prisma.user.update({
        where: { cpf: cpf },
        data: {
            phone: userDto.phone,
            name: userDto.name,
            userType: userDto.userType,
        },
    });



    return prisma.employee.update({
      where: {
        userCpf: cpf,
      },
      data: {
        employeeType: userDto.employee?.employeeType,
      },
      include: { user: true}
    });
  },

  async getEmployee(cpf: string) {
    return prisma.employee.findUnique({
        where: {
            userCpf: cpf,
        },
        include: { user: true },
    });
  },

  async deleteEmployee(cpf: string) {
    await prisma.employee.delete({
        where: {
            userCpf: cpf,
        },
    });

    await prisma.user.delete({
        where: {
            cpf: cpf,
        },
    });
  },
  
};
