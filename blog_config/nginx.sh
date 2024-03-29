# eval "./start_site.sh -b"
# eval "./start_system.sh -b"

#

echo "start nginx"

usage="./start.sh [-b|--build] [-l|--local]"

run_cmd="docker-compose "
compose_file="docker-compose-nginx.yml"
compose_file_local="docker-compose-nginx.yml"
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

if [[ "$local" == true ]]; then
    compose_file="${compose_file_local}"
else
    compose_file="${compose_file}"
fi

if [[ "$build" == true ]]; then
    cmd="${run_cmd} -f ${compose_file} up --build"
else
    cmd="${run_cmd} -f ${compose_file} up"
fi

eval "$cmd"
