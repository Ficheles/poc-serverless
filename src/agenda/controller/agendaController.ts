import { create, getAll } from '../service/agendaService';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppError } from '../../utils/appError';
import { getErrorMessage } from '../../utils/error';
import { ErrorMessages } from '../../utils/errorMessages';

export const main = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const agendas = await getAll();

    return {
      statusCode: 200,
      body: JSON.stringify({
        medicos: agendas,
      }),
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

export const createAgenda = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: ErrorMessages.BAD_REQUEST,
        }),
      };
    }

    const agendas = await create(JSON.parse(event.body));

    return {
      statusCode: 200,
      body: JSON.stringify({
        medicos: agendas,
      }),
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({ message: error.message }),
      };
    }

    // Erros não tratados
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: ErrorMessages.INTERNAL_ERROR,
        error: getErrorMessage(error),
      }),
    };
  }
};
