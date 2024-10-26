import { schedules } from '../../schedule/mocks/schedulesData';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AppointmentDto } from '../dto/appointmentDto';
import { Appointment } from '../interface/appointmentTypes';

export const createAppointment = async (appointmentDto: AppointmentDto): Promise<Appointment> => {
  const doctor = schedules.find(doctor => doctor.id === appointmentDto.medico_id);
  if (!doctor) throw new AppError(ErrorMessages.MEDICO_NAO_ENCONTRADO);
  if (!doctor.horarios_disponiveis.some((horario: string) => horario == appointmentDto.data_horario)) {
    throw new AppError(ErrorMessages.HORARIO_NAO_DISPONIVEL);
  }
  const appointment: Appointment = {
    medico: doctor.nome,
    paciente: appointmentDto.paciente_nome,
    data_horario: appointmentDto.data_horario,
  };

  return appointment;
};
