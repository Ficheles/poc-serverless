import { AppointmentResponse } from '../dto/appointmentoResponse';

export const appointmentResponse: AppointmentResponse = {
  mensagem: 'Agendamento realizado com sucesso',
  agendamento: {
    medico: 'Dr. João Silva',
    paciente: 'Carlos Almeida',
    data_horario: '2024-10-05 09:00',
  },
};
