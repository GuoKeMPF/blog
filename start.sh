# eval "./start_site.sh -b"
# eval "./start_system.sh -b"

#

echo "start project"

usage="./start.sh [-b|--build] [-l|--local]"

run_cmd="docker-compose "
compose_file="docker-compose.yml"
compose_file_local="docker-compose-local.yml"
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
    source ./build_static.sh
    cmd="${run_cmd} -f ${compose_file} up --build"
else
    cmd="${run_cmd} -f ${compose_file} up"
fi

eval "$cmd"
