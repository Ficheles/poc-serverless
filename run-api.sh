BASE_URL=http://localhost:3000

echo '\nGet:'
curl --silent $BASE_URL/agendas --write-out ' - %{http_code}\n' --show-error

