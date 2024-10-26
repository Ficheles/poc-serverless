export interface Agendamento {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface AgendamentoResponse {
  mensagem: string;
  agendamento: Agendamento;
}
