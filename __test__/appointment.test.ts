import { create } from '../src/appointment/controller/appointmentController'; // Ajuste o caminho conforme necessário
import { APIGatewayEvent } from 'aws-lambda';
import { ErrorMessages } from '../src/utils/errorMessages';
import { createAppointment } from '../src/appointment/service/appointmentService';
import { AppError } from '../src/utils/appError';

jest.mock('../src/appointment/service/appointmentService');

describe('createAgendamento Handler', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reseta todos os mocks antes de cada teste
  });

  it('should return 201 and the success message', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (createAppointment as jest.Mock).mockResolvedValueOnce({
      medico: 'Dr. João Silva',
      paciente: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    });

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify({
        mensagem: 'Agendamento realizado com sucesso',
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-10-05 09:00',
        },
      }),
    });
  });

  it('should return 400 if the body is missing', async () => {
    const event: APIGatewayEvent = {
      body: null, // Corpo ausente
    } as APIGatewayEvent;

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.BAD_REQUEST,
      }),
    });
  });

  it('should return 400 if there is a validation error: missing medico_id', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.REQUIRED_FIELD('medico_id'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('should return 400 if there is a validation error: medico_id not found', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 3,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (createAppointment as jest.Mock).mockRejectedValue(new AppError(ErrorMessages.DOCTOR_NOT_FOUND));
    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.DOCTOR_NOT_FOUND,
      }),
    });
  });

  it('should return 400 if there is a validation error: missing paciente_nome', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.REQUIRED_FIELD('paciente_nome'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('should return 400 if there is a validation error: missing data_horario', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
      }),
    } as APIGatewayEvent;

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.REQUIRED_FIELD('data_horario'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('should return 400 if there is a validation error: data_horario not found', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (createAppointment as jest.Mock).mockRejectedValue(new AppError(ErrorMessages.TIME_NOT_AVAILABLE));
    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.TIME_NOT_AVAILABLE,
      }),
    });
  });

  it('should return 500 in case of an unexpected error', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as unknown as APIGatewayEvent;

    (createAppointment as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: ErrorMessages.INTERNAL_ERROR,
        error: 'Erro inesperado',
      }),
    });
  });
});
