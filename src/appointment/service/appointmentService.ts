import { schedules } from '../../schedule/mocks/schedulesData';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { AppointmentDto } from '../dto/appointmentDto';
import { Appointment } from '../interface/appointmentTypes';

export const createAppointment = async (appointmentDto: AppointmentDto): Promise<Appointment> => {
  const doctor = schedules.find(doctor => doctor.id === appointmentDto.medico_id);
  if (!doctor) throw new AppError(ErrorMessages.DOCTOR_NOT_FOUND);
  if (!doctor.horarios_disponiveis.some((horario: string) => horario == appointmentDto.data_horario)) {
    throw new AppError(ErrorMessages.TIME_NOT_AVAILABLE);
  }
  const appointment: Appointment = {
    medico: doctor.nome,
    paciente: appointmentDto.paciente_nome,
    data_horario: appointmentDto.data_horario,
  };

  return appointment;
};
