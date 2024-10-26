import { AppError } from '../../src/utils/appError';

describe('AppError', () => {
  it('deve criar um erro com a mensagem correta e código de status padrão', () => {
    const error = new AppError('Mensagem de erro');

    expect(error.message).toBe('Mensagem de erro');
    expect(error.statusCode).toBe(400); // Código de status padrão
  });

  it('deve criar um erro com a mensagem correta e código de status personalizado', () => {
    const error = new AppError('Erro personalizado', 404);

    expect(error.message).toBe('Erro personalizado');
    expect(error.statusCode).toBe(404); // Código de status personalizado
  });

  it('deve manter a stack trace do erro', () => {
    const error = new AppError('Erro com stack trace');

    expect(error.stack).toBeDefined();
  });
});
