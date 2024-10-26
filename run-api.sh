BASE_URL=http://localhost:3000

echo '\nGet:'
curl --silent $BASE_URL/agendas --write-out ' - %{http_code}\n' --show-error

echo '\nPOST:'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 1, "paciente_nome": "Carlos Almeida", "data_horario": "2024-10-05 09:00"}' \
$BASE_URL/agendamento

echo '\nPOST: medico não encontrado'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 3, "paciente_nome": "Carlos Almeida", "data_horario": "2024-10-05 09:00"}' \
$BASE_URL/agendamento

echo '\nPOST: medico ausente'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{ "paciente_nome": "Carlos Almeida", "data_horario": "2024-10-05 09:00"}' \
$BASE_URL/agendamento


echo '\nPOST: paciente ausente'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 1, "data_horario": "2024-10-05 09:00"}' \
$BASE_URL/agendamento


echo '\nPOST: data_horario ausente'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 1, "paciente_nome": "Carlos Almeida" }' \
$BASE_URL/agendamento

echo '\nPOST: data_horario invalido'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 1, "paciente_nome": "Carlos Almeida", "data_horario": "DATA INVALIDA"}' \
$BASE_URL/agendamento


echo '\nPOST: data_horario não encontrado'
curl -X POST \
--write-out ' - %{http_code}\n' --silent --show-error \
--header "Content-Type: application/json" \
--data '{"medico_id": 1, "paciente_nome": "Carlos Almeida", "data_horario": "2024-10-05 12:00"}' \
$BASE_URL/agendamento
