import { Agenda } from '../interface/agendaType';
import { AgendaDto } from '../dto/agendaDto';
import { agendas } from '../mocks/agendasData';

export const create = async (agendaDto: AgendaDto): Promise<Agenda> => {
  const agenda: Agenda = {
    ...agendaDto,
    id: agendas.length + 1,
  };

  agendas.push(agenda);

  return agenda;
};

export const getAll = async (): Promise<Agenda[]> => {
  return agendas;
};
