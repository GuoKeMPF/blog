echo "stop server"

usage="./stop_server.sh"

run_cmd="docker-compose "
compose_file="docker-compose-server.yml"

cmd="${run_cmd} -f ${compose_file} down"

eval "$cmd"
