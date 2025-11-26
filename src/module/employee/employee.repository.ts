import { UserDTO } from "../../dto/UserDTO";
import prisma from "../../prisma";
import { UserRepository } from "../user/user.repository";
export const EmployeeRepository = {
  async createEmployee(userDto: UserDTO) {

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
};
