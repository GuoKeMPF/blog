#

echo "start project"

usage="./start.sh [-b|--build]"

if [[ $# -gt 0 ]]; then
  args=("$@")
  for ((i = 0; i < $#; i++)); do
    case "${args[$i]}" in
    -b | --build)
      build=true
      ;;
    *)
      echo "$usage"
      exit
      ;;
    esac
  done
fi

run_cmd="docker-compose "
compose_file="docker-compose_site.yml"
cmd=""

if [[ "$build" == true ]]; then
  cmd="${run_cmd} -f ${compose_file} up --build"
else
  cmd="${run_cmd} -f ${compose_file} up"
fi

eval "$cmd"
