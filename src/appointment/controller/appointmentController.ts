import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getErrorMessage } from '../../utils/error';
import { Appointment, AppointmentResponse } from '../interface/appointmentTypes';
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

    const data = JSON.parse(event.body);
    validate(data);

    const appointment: Appointment = await createAppointment(data);

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
