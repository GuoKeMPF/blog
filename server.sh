echo "start server"

usage="./start_server.sh [-b|--build]"

run_cmd="docker-compose "
compose_file="docker-compose-server.yml"
cmd=""

if [[ $# -gt 0 ]]; then
    args=("$@")
    for ((i = 0; i < $#; i++)); do
        case "${args[$i]}" in
        -b | --build)
            build=true
            ;;

        -l | --local)
            local=true
            ;;
        *)
            echo "$usage"
            exit
            ;;
        esac
    done
fi

if [[ "$build" == true ]]; then
    cmd="${run_cmd} -f ${compose_file} up --build"
else
    cmd="${run_cmd} -f ${compose_file} up"
fi

eval "$cmd"
