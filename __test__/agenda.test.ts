import { main, createAgenda } from '../src/agenda/controller/agendaController';
import { getAll, create } from '../src/agenda/service/agendaService'; // Importe as funções necessárias
import { APIGatewayEvent } from 'aws-lambda';
import { AppError } from '../src/utils/appError'; // Importe a classe de erro
import { ErrorMessages } from '../src/utils/errorMessages'; // Ajuste o caminho conforme necessário

jest.mock('../src/agenda/service/agendaService'); // Mock dos serviços

describe('Agenda Handlers', () => {
  describe('main', () => {
    it('deve retornar 200 e a lista de médicos', async () => {
      (getAll as jest.Mock).mockResolvedValueOnce([
        {
          id: 2,
          nome: 'Dra. Maria Souza',
          especialidade: 'Dermatologista',
          horarios_disponiveis: ['2024-10-06 14:00', '2024-10-06 15:00'],
        },
      ]);

      const event = {} as APIGatewayEvent; // Mock do evento
      const result = await main(event);

      expect(result).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          medicos: [
            {
              id: 2,
              nome: 'Dra. Maria Souza',
              especialidade: 'Dermatologista',
              horarios_disponiveis: ['2024-10-06 14:00', '2024-10-06 15:00'],
            },
          ],
        }),
      });
    });

    it('deve retornar 500 em caso de erro inesperado', async () => {
      (getAll as jest.Mock).mockRejectedValueOnce(new Error('Erro inesperado'));

      const event = {} as APIGatewayEvent;
      const result = await main(event);

      expect(result).toEqual({
        statusCode: 500,
        body: JSON.stringify({
          message: ErrorMessages.INTERNAL_ERROR,
          error: 'Erro inesperado',
        }),
      });
    });

    it('deve retornar o status do AppError', async () => {
      const appError = new AppError('Erro de Aplicação', 400);
      (getAll as jest.Mock).mockRejectedValueOnce(appError);

      const event = {} as APIGatewayEvent;
      const result = await main(event);

      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify({ message: 'Erro de Aplicação' }),
      });
    });
  });

  describe('createAgenda', () => {
    const agendaDto = {
      nome: 'Dr Carlos',
      especialidade: 'Cardiologia',
      horarios_disponiveis: ['2024-10-05T09:00:00Z'],
    };

    it('deve retornar 200 e a agenda criada', async () => {
      (create as jest.Mock).mockResolvedValueOnce(agendaDto);

      const event = {
        body: JSON.stringify(agendaDto),
      } as APIGatewayEvent;
      const result = await createAgenda(event);

      expect(result).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          medicos: agendaDto,
        }),
      });
    });

    it('deve retornar 400 se o corpo estiver ausente', async () => {
      const event = { body: null } as APIGatewayEvent;
      const result = await createAgenda(event);

      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify({
          message: ErrorMessages.BAD_REQUEST,
        }),
      });
    });

    it('deve retornar 500 em caso de erro inesperado', async () => {
      const messageError = 'Erro inesperado';
      (create as jest.Mock).mockRejectedValueOnce(new Error(messageError));

      const event = {
        body: JSON.stringify(agendaDto),
      } as APIGatewayEvent;
      const result = await createAgenda(event);

      expect(result).toEqual({
        statusCode: 500,
        body: JSON.stringify({
          message: ErrorMessages.INTERNAL_ERROR,
          error: messageError,
        }),
      });
    });

    it('deve retornar o status do AppError', async () => {
      const messageError = 'Erro de Aplicação';
      const appError = new AppError(messageError, 400);
      (create as jest.Mock).mockRejectedValueOnce(appError);

      const event = {
        body: JSON.stringify(agendaDto),
      } as APIGatewayEvent;
      const result = await createAgenda(event);

      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify({ message: messageError }),
      });
    });
  });
});
