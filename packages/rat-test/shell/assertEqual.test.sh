DIRECTORY_NAME=`dirname $BASH_SOURCE`
source "$DIRECTORY_NAME/../../ikaria-test/shell/report.sh"
source "$DIRECTORY_NAME/assertEqual.sh"
source "$DIRECTORY_NAME/../../ikaria-test/shell/underline.sh"

report `underline rat-test/shell/assertEqual`
report "• assertEqual"

report "  ⇀ Testing inputs that are equal"
STD_OUT=""
EXIT_CODE=""

STD_OUT=`assertEqual 0 0`
EXIT_CODE=$?

[ "$STD_OUT" = "" ] || exit 1
[ "$EXIT_CODE" = "0" ] || exit 2

report "  ⇀ Testing inputs that are not equal"
STD_OUT=""
EXIT_CODE=""

STD_OUT=`assertEqual 0 1`
EXIT_CODE=$?

[ "$STD_OUT" = $'Actual:\n0\n\nExpected:\n1' ] || exit 3
[ "$EXIT_CODE" = "1" ] || exit 4
