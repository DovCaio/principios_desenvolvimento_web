import { UserDTO } from "../../dto/UserDTO";
import { EmployeeRepository } from "./employee.repository";

export const EmployeeService =  {

    async create(userDto: UserDTO) {
        return EmployeeRepository.createEmployee(userDto);
    }

}
