import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AppointmentDto } from '../dto/appointmentDto';

export const validate = (data: AppointmentDto): void => {
  if (!data.medico_id) throw new AppError(ErrorMessages.CAMPO_OBRIGATORIO('medico_id'));

  if (!data.paciente_nome) throw new AppError(ErrorMessages.CAMPO_OBRIGATORIO('paciente_nome'));

  if (!data.data_horario) throw new AppError(ErrorMessages.CAMPO_OBRIGATORIO('data_horario'));

  if (isNaN(Date.parse(data.data_horario))) throw new AppError(ErrorMessages.DATA_INVALIDA);
};
