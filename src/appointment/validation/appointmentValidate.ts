import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AppointmentDto } from '../dto/appointmentDto';

export const validate = (data: AppointmentDto): void => {
  if (!data.medico_id) throw new AppError(ErrorMessages.REQUIRED_FIELD('medico_id'));

  if (!data.paciente_nome) throw new AppError(ErrorMessages.REQUIRED_FIELD('paciente_nome'));

  if (!data.data_horario) throw new AppError(ErrorMessages.REQUIRED_FIELD('data_horario'));

  if (isNaN(Date.parse(data.data_horario))) throw new AppError(ErrorMessages.INVALID_DATE);
};
