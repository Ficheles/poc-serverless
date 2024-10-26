import { isErrorWithMessage, toErrorWithMessage, getErrorMessage } from '../../src/utils/error';

describe('Error Utilities', () => {
  describe('isErrorWithMessage', () => {
    it('deve retornar true para um objeto de erro com mensagem', () => {
      const error = { message: 'Erro conhecido' };
      expect(isErrorWithMessage(error)).toBe(true);
    });

    it('deve retornar false para um objeto que não possui mensagem', () => {
      const error = { code: 404 };
      expect(isErrorWithMessage(error)).toBe(false);
    });

    it('deve retornar false para valores não objetos', () => {
      expect(isErrorWithMessage(null)).toBe(false);
      expect(isErrorWithMessage(42)).toBe(false);
      expect(isErrorWithMessage('erro')).toBe(false);
    });
  });

  describe('toErrorWithMessage', () => {
    it('deve retornar o erro original se for um ErrorWithMessage', () => {
      const error = { message: 'Erro conhecido' };
      expect(toErrorWithMessage(error)).toBe(error);
    });

    it('deve converter um objeto não reconhecido em um erro com mensagem', () => {
      const result = toErrorWithMessage({ code: 500 });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('{"code":500}');
    });

    it('deve converter um valor não objeto em um erro com mensagem', () => {
      const result = toErrorWithMessage(42);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('42');
    });
  });

  describe('getErrorMessage', () => {
    it('deve retornar a mensagem de um erro conhecido', () => {
      const error = { message: 'Erro conhecido' };
      expect(getErrorMessage(error)).toBe('Erro conhecido');
    });

    it('deve retornar uma mensagem de erro padrão para um erro desconhecido', () => {
      const result = getErrorMessage({ code: 500 });
      expect(result).toBe('{"code":500}');
    });

    it('deve retornar uma mensagem padrão para um valor não objeto', () => {
      const result = getErrorMessage(42);
      expect(result).toBe('42');
    });
  });
});
