# API Backend com Serverless Framework e AWS Lambda

Este repositório é uma prova de conceito (PoC) para demonstrar a implementação de uma aplicação serverless utilizando o framework Serverless Framework e TypeScript. O projeto inclui um endpoint para agendamentos, com validação de dados de entrada e estrutura organizada de acordo com as práticas de Domain-Driven Design (DDD).

## Funcionalidades

- Endpoint de Agendamento: Permite criar agendamentos com informações sobre médico e paciente.
- Validação de Dados: Implementa validações básicas para garantir a integridade das informações recebidas.
- Testes Automatizados: Inclui testes usando Jest para garantir o funcionamento adequado dos endpoints.

## Tecnologias Utilizadas

- Serverless Framework: Para gerenciamento e implantação de funções serverless.
- TypeScript: Para garantir tipagem estática e melhorar a manutenção do código.
- Jest: Para testes automatizados.

## Requisitos

- Node.js v16 ou superior
- Utilizado v18 para o desenvolvimento
- Serverless Framework instalado globalmente

```bash
npm install global serverless
```

## Como Começar

1. Clone este repositório.

2. Instale as dependências:

```bash
yarn install
```

3. Compilar o projeto

```bash
yarn build
```

4. Executar ambiente:

```bash
yarn start
```

5. Executar suíte de testes:

```bash
yarn test
```

### Descrição da API:

1. **Endpoint: Buscar agendas e horários dos médicos**
   - **Rota**: `GET /agendas`
   - **Descrição**: Retorna uma lista de médicos com suas respectivas agendas e horários disponíveis.
   - **Resposta esperada**:

```json
{
  "medicos": [
    {
      "id": 1,
      "nome": "Dr. João Silva",
      "especialidade": "Cardiologista",
      "horarios_disponiveis": ["2024-10-05 09:00", "2024-10-05 10:00", "2024-10-05 11:00"]
    },
    {
      "id": 2,
      "nome": "Dra. Maria Souza",
      "especialidade": "Dermatologista",
      "horarios_disponiveis": ["2024-10-06 14:00", "2024-10-06 15:00"]
    }
  ]
}
```

#### Pode utilizar esta linha de comando para testar

```bash
curl -s http://localhost:3000/agendas
```

#### Ou simulando uma chamada via serverless

```bash
serverless invoke local --function agendas
```

2. **Endpoint: Marcar agendamento do paciente**
   - **Rota**: `POST /agendamento`
   - **Descrição**: Permite que o paciente marque um horário de consulta com um médico.
   - **Payload esperado**:

```json
{
  "medico_id": 1,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 09:00"
}
```

- **Resposta esperada**:

```json
{
  "mensagem": "Agendamento realizado com sucesso",
  "agendamento": {
    "medico": "Dr. João Silva",
    "paciente": "Carlos Almeida",
    "data_horario": "2024-10-05 09:00"
  }
}
```

#### Pode utilizar esta linha de comando para testar

```bash
curl -s -X POST http://localhost:3000/agendamento \
--data '{"medico_id": 1, "paciente_nome": "Carlos Almeida", "data_horario": "2024-10-05 09:00"}'
```

#### Ou simulando uma chamada via serverless

```bash
serverless invoke local --function agendamento --data '{"body": "{\"medico_id\": 1, \"paciente_nome\": \"Carlos Almeida\", \"data_horario\": \"2024-10-05 09:00\"}"}'
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Sinta-se à vontade para ajustar conforme necessário para atender às suas necessidades específicas!
