import { createAgendamento } from '../src/agendamento/controller/agendamentoController'; // Ajuste o caminho conforme necessário
import { APIGatewayEvent } from 'aws-lambda';
import { ErrorMessages } from '../src/utils/errorMessages';
import { create } from '../src/agendamento/service/agendamentoService';
import { AppError } from '../src/utils/appError';

jest.mock('../src/agendamento/service/agendamentoService');

describe('createAgendamento Handler', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reseta todos os mocks antes de cada teste
  });

  it('deve retornar 201 e a mensagem de sucesso', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (create as jest.Mock).mockResolvedValueOnce({
      medico: 'Dr. João Silva',
      paciente: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    });

    const result = await createAgendamento(event);

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

  it('deve retornar 400 se o corpo estiver ausente', async () => {
    const event: APIGatewayEvent = {
      body: null, // Corpo ausente
    } as APIGatewayEvent;

    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.BAD_REQUEST,
      }),
    });
  });

  it('deve retornar 400 se houver erro de validação medico_id ausente', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.CAMPO_OBRIGATORIO('medico_id'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('deve retornar 400 se houver erro de validação medico_id não encontrado', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 3,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (create as jest.Mock).mockRejectedValue(new AppError(ErrorMessages.MEDICO_NAO_ENCONTRADO));
    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.MEDICO_NAO_ENCONTRADO,
      }),
    });
  });

  it('deve retornar 400 se houver erro de validação paciente_nome ausente', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.CAMPO_OBRIGATORIO('paciente_nome'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('deve retornar 400 se houver erro de validação data_horario ausente', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
      }),
    } as APIGatewayEvent;

    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.CAMPO_OBRIGATORIO('data_horario'), // Certifique-se que isso corresponde à sua implementação de validação
      }),
    });
  });

  it('deve retornar 400 se houver erro de validação data_horario não encontrado', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayEvent;

    (create as jest.Mock).mockRejectedValue(new AppError(ErrorMessages.HORARIO_NAO_DISPONIVEL));
    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: ErrorMessages.HORARIO_NAO_DISPONIVEL,
      }),
    });
  });

  it('deve retornar 500 em caso de erro inesperado', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as unknown as APIGatewayEvent;

    (create as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));

    const result = await createAgendamento(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Erro inesperado',
      }),
    });
  });
});
