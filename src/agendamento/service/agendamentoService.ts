import { agendas } from '../../agenda/mocks/agendasData';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AgendamentoDto } from '../dto/agendamentoDto';
import { Agendamento } from '../interface/agendamentoTypes';
import { validate } from '../validation/agendamentoValidate';

export const create = async (agendamentoDto: AgendamentoDto): Promise<Agendamento> => {
  const medico = agendas.find(medico => medico.id === agendamentoDto.medico_id);
  if (!medico) throw new AppError(ErrorMessages.MEDICO_NAO_ENCONTRADO);
  if (!medico.horarios_disponiveis.some((horario: string) => horario == agendamentoDto.data_horario)) {
    throw new AppError(ErrorMessages.HORARIO_NAO_DISPONIVEL);
  }
  const agendamento: Agendamento = {
    medico: medico.nome,
    paciente: agendamentoDto.paciente_nome,
    data_horario: agendamentoDto.data_horario,
  };

  // TODO: Deveria realizar a presistencia do agedamento
  return agendamento;
};
