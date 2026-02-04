import { UserType } from "@prisma/client";
import { EmployeeCreateDTO } from "../dto/employee/EmployeeCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import { EmployeeRepository } from "../repository/employee.repository";
import { hashPassword } from "../utils/auth";

export const EmployeeService = {

    async create(userDto: EmployeeCreateDTO) {
        const hashedPassword = await hashPassword(userDto.password);

        const data = {
            ...userDto,
            password: hashedPassword,
            userType: UserType.EMPLOYEE
        };

        return EmployeeRepository.createEmployee(data as any);
    },

    async update(cpf: string, userDto: UserPutDTO) {
        return EmployeeRepository.updateEmployee(cpf, userDto);
    },

    async get(cpf: string) {
        return EmployeeRepository.getEmployee(cpf);
    },

    async delete(cpf: string) {
        return EmployeeRepository.deleteEmployee(cpf);
    }
}