import { create } from '../service/agendamentoService';
// import { validate } from '../validation/agendamentoValidate';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getErrorMessage } from '../../utils/error';
import { Agendamento, AgendamentoResponse } from '../interface/agendamentoTypes';
import { AppError } from '../../utils/appError';
import { ErrorMessages } from '../../utils/errorMessages';
import { validate } from '../validation/agendamentoValidate';

export const createAgendamento = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
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

    const appointment: Agendamento = await create(data);

    const agendamentoResponse: AgendamentoResponse = {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: appointment,
    };

    return {
      statusCode: 201,
      body: JSON.stringify(agendamentoResponse),
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
