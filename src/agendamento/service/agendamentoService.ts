import { schedules } from '../../schedule/mocks/schedulesData';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AgendamentoDto } from '../dto/agendamentoDto';
import { Agendamento } from '../interface/agendamentoTypes';

export const create = async (agendamentoDto: AgendamentoDto): Promise<Agendamento> => {
  const doctor = schedules.find(doctor => doctor.id === agendamentoDto.medico_id);
  if (!doctor) throw new AppError(ErrorMessages.MEDICO_NAO_ENCONTRADO);
  if (!doctor.horarios_disponiveis.some((horario: string) => horario == agendamentoDto.data_horario)) {
    throw new AppError(ErrorMessages.HORARIO_NAO_DISPONIVEL);
  }
  const agendamento: Agendamento = {
    medico: doctor.nome,
    paciente: agendamentoDto.paciente_nome,
    data_horario: agendamentoDto.data_horario,
  };

  return agendamento;
};
