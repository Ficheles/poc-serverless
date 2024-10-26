export interface Appointment {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface AppointmentResponse {
  mensagem: string;
  agendamento: Appointment;
}
