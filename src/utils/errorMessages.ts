export const ErrorMessages = {
  BAD_REQUEST: 'Bad Request: Body is missing',
  INTERNAL_ERROR: 'Internal Server Error',
  DOCTOR_NOT_FOUND: 'Médico não encontrado.',
  TIME_NOT_AVAILABLE: 'Horário não disponível.',
  REQUIRED_FIELD: (field: string) => `O campo ${field} é obrigatório.`,
  INVALID_DATE: 'O campo data_horario deve ser uma data válida.',
};
