import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getErrorMessage } from '../../utils/error';
import { Appointment } from '../interface/appointment';
import { AppointmentDto } from '../dto/appointmentDto';
import { AppointmentResponse } from '../dto/appointmentoResponse';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { createAppointment } from '../service/appointmentService';
import { validate } from '../validation/appointmentValidate';

export const create = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: ErrorMessages.BAD_REQUEST,
        }),
      };
    }

    const appointmentDto: AppointmentDto = JSON.parse(event.body);
    validate(appointmentDto);

    const appointment: Appointment = await createAppointment(appointmentDto);

    const appointmentResponse: AppointmentResponse = {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: appointment,
    };

    return {
      statusCode: 201,
      body: JSON.stringify(appointmentResponse),
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({ message: error.message }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: ErrorMessages.INTERNAL_ERROR,
        error: getErrorMessage(error),
      }),
    };
  }
};
