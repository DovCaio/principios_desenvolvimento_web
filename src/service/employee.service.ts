import { LotAction, UserType } from "@prisma/client";
import { EmployeeCreateDTO } from "../dto/employee/EmployeeCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import { EmployeeRepository } from "../repository/employee.repository";
import { hashPassword } from "../utils/auth";
import { LotRepository } from "../repository/lot.repository";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { LotNotFoundException } from "../exceptions/LotNotFoundException";
import { AlreadyAssocietedException } from "../exceptions/AlreadyAssocietedException";
import { ResidentRepository } from "../repository/resident.repository";
import { NotAssociateResidentException } from "../exceptions/NotAssociateResidentException";

export const EmployeeService = {
  async create(userDto: EmployeeCreateDTO) {
    const hashedPassword = await hashPassword(userDto.password);

    const data = {
      ...userDto,
      password: hashedPassword,
      userType: UserType.EMPLOYEE,
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

  async validateUser(cpf: string) {
    const user = await ResidentRepository.getOne(cpf);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  },

  async validateLot(lotId: number) {
    const lot = await LotRepository.get(lotId);

    if (!lot) {
      throw new LotNotFoundException();
    }

    return lot;
  },

  async associateResidentLot(resindetCpf: string, employeeCpf: string, lotId: number) {

    const user = await this.validateUser(resindetCpf);

    const lot = await this.validateLot(lotId);

    const residentAlreadAssociated = await LotRepository.getResidentByCpfInLot(
      lotId,
      resindetCpf,
    );

    if (residentAlreadAssociated) {
      throw new AlreadyAssocietedException();
    }

    await LotRepository.createHistoricEntry(lotId, LotAction.ADDED_RESIDENT, employeeCpf, resindetCpf);

    return LotRepository.associateResidentLot(resindetCpf, lotId);
  },

  async dessociateResidentLot(residentCpf: string, employeeCpf: string, lotId: number) {
    const user = await this.validateUser(residentCpf);

    const lot = await this.validateLot(lotId);

    const residentAlreadAssociated = await LotRepository.getResidentByCpfInLot(
      lotId,
      residentCpf,
    );

    if (!residentAlreadAssociated) {
      throw new NotAssociateResidentException();
    }

    await LotRepository.createHistoricEntry(lotId, LotAction.REMOVED_RESIDENT, employeeCpf, residentCpf);

    return LotRepository.dessociateResidentLot(residentCpf, lotId);
  },
  async associateResidentLotResponsible(residentCpf: string, employeeCpf: string, lotId: number) {
    const user = await ResidentRepository.getOne(residentCpf);

    if (!user) {
      throw new UserNotFoundException();
    }

    const lot = await LotRepository.get(lotId);

    if (!lot) {
      throw new LotNotFoundException();
    }

    await LotRepository.createHistoricEntry(lotId, LotAction.ASSIGNED_RESPONSIBLE, employeeCpf, residentCpf);

    return LotRepository.associateResidentLotResponsible(residentCpf, lotId);
  },

  async unmakeResponsibleResidentLot(residentCpf: string, employeeCpf: string, lotId: number) {
    const user = await ResidentRepository.getOne(residentCpf);

    if (!user) {
      throw new UserNotFoundException();
    }

    const lot = await LotRepository.get(lotId);

    if (!lot) {
      throw new LotNotFoundException();
    }

    const residentAlreadAssociated = await LotRepository.getResidentByCpfInLot(
      lotId,
      residentCpf,
    );

    if (!residentAlreadAssociated) {
      throw new NotAssociateResidentException();
    }

    const isResponsible = await LotRepository.isResponsible(residentCpf, lotId);

    if (!isResponsible) {
      throw new NotAssociateResidentException(
        "Esse usuário não é responsável por esse lote.",
      );
    }

      await LotRepository.createHistoricEntry(lotId, LotAction.UNASSIGNED_RESPONSIBLE, employeeCpf, residentCpf);

    return LotRepository.unmakeResponsibleResidentLot(residentCpf, lotId);
  },
  async getLotHistoric(lotId: number) {
    const lot = await LotRepository.get(lotId);

    if (!lot) {
      throw new LotNotFoundException();
    }

    return LotRepository.getLotHistoric(lotId);
  }
};
