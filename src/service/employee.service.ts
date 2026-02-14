import { UserType } from "@prisma/client";
import { EmployeeCreateDTO } from "../dto/employee/EmployeeCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import { EmployeeRepository } from "../repository/employee.repository";
import { hashPassword } from "../utils/auth";
import { LotRepository } from "../repository/lot.repository";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { LotNotFoundException } from "../exceptions/LotNotFoundException";
import { AlreadyAssocietedException } from "../exceptions/AlreadyAssocietedException";
import { ResidentRepository } from "../repository/resident.repository";

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
    },

    async associateResidentLot(cpf: string, lotId: number) { //somente usuário do tipo gestão podem fazer isso, porém como isso é questão de autorização, vai ser tratado no controller ou em um middleware, aqui a gente só faz a associação mesmo

        const user = await ResidentRepository.getOne(cpf);

        if (!user) {
            throw new UserNotFoundException();
        }

        const lot = await LotRepository.get(lotId);

        if (!lot) {
            throw new LotNotFoundException();
        }

        const residentAlreadAssociated = await LotRepository.getResidentByCpfInLot(lotId, cpf);

        if (residentAlreadAssociated) {
            throw new AlreadyAssocietedException();
        }

            
        return LotRepository.associateResidentLot(cpf, lotId);
    },

    async dessociateResidentLot(cpf: string, lotId: number) {

        const user = await ResidentRepository.getOne(cpf);

        if (!user) {
            throw new UserNotFoundException();
        }

        const lot = await LotRepository.get(lotId);

        if (!lot) {
            throw new LotNotFoundException();
        }

        return LotRepository.dessociateResidentLot(cpf, lotId);
    }
}