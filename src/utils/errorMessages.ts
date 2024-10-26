export const ErrorMessages = {
  BAD_REQUEST: 'Bad Request: Body is missing',
  INTERNAL_ERROR: 'Internal Server Error',
  MEDICO_NAO_ENCONTRADO: 'Médico não encontrado.',
  HORARIO_NAO_DISPONIVEL: 'Horário não disponível.',
  CAMPO_OBRIGATORIO: (field: string) => `O campo ${field} é obrigatório.`,
  DATA_INVALIDA: 'O campo data_horario deve ser uma data válida.',
};
