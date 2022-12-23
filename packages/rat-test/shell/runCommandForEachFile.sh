DIRECTORY_NAME=`dirname $BASH_SOURCE`
source "$DIRECTORY_NAME/../../ikaria-test/bash/underline.sh"

set -e

COMMAND="$1"
EXTENSION_REGEX="$2"

function run () {
  FILE_PATH="$1"
  EXTENSIONLESS_FILE_PATH=`echo $FILE_PATH | sed "s/$EXTENSION_REGEX$//"`

  echo `underline $EXTENSIONLESS_FILE_PATH`
  $COMMAND "$FILE_PATH"

  printf "\n"
}

for NEXT_FILE_PATH in "${@:3}"
do
  run $NEXT_FILE_PATH
done
