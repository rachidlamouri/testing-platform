DIRECTORY_NAME=`dirname $BASH_SOURCE`
source "$DIRECTORY_NAME/../../ikaria-test/bash/report.sh"
source "$DIRECTORY_NAME/assertEqual.sh"
source "$DIRECTORY_NAME/../../ikaria-test/bash/underline.sh"

TEMPORARY_DIRECTORY_NAME="tmp"

function arrangeTmp() {
  mkdir $TEMPORARY_DIRECTORY_NAME
}

function arrangeFile() {
  FILE_NAME=$1
  EXIT_CODE=$2
  FILE_PATH="$TEMPORARY_DIRECTORY_NAME/$FILE_NAME"
  cat > "$FILE_PATH" << __End
    echo "Hello from $FILE_NAME"
    exit "$EXIT_CODE"
__End

  echo "$FILE_PATH"
}

function annihilateTmp() {
  rm -r $TEMPORARY_DIRECTORY_NAME
}

report `underline rat-test/shell/runCommandForEachFile`
report "• runCommandForEachFile"

report "  ⇀ Testing a single file that exits without error"
FILE_NAME_1="file1.txt"
FILE_EXIT_CODE_1="0"
FILE_PATH_1=""
STD_OUT=""
EXIT_CODE=""
EXPECTED_STD_OUT=`underline "tmp/file1"`$'\nHello from file1.txt'
arrangeTmp
FILE_PATH_1=$(arrangeFile "$FILE_NAME_1" "$FILE_EXIT_CODE_1")

STD_OUT=`bash "$DIRECTORY_NAME/runCommandForEachFile.sh" "bash" "\\.txt" "$FILE_PATH_1"`
EXIT_CODE=$?

annihilateTmp

assertEqual "$EXIT_CODE" 0 || exit 1
assertEqual "$STD_OUT" "$EXPECTED_STD_OUT" || exit 2

report "  ⇀ Testing a single file that exits with an error"
FILE_NAME_1="file1.txt"
FILE_EXIT_CODE_1="1"
FILE_PATH_1=""
STD_OUT=""
EXIT_CODE=""
EXPECTED_STD_OUT=`underline "tmp/file1"`$'\nHello from file1.txt'
arrangeTmp
FILE_PATH_1=$(arrangeFile "$FILE_NAME_1" "$FILE_EXIT_CODE_1")

STD_OUT=`bash "$DIRECTORY_NAME/runCommandForEachFile.sh" "bash" "\\.txt" "$FILE_PATH_1"`
EXIT_CODE=$?

annihilateTmp

assertEqual "$EXIT_CODE" 1 || exit 3
assertEqual "$STD_OUT" "$EXPECTED_STD_OUT" || exit 4

report "  ⇀ Testing multiple files without errors"
FILE_NAME_1="file1.test.txt"
FILE_EXIT_CODE_1="0"
FILE_PATH_1=""
FILE_NAME_2="file2.test.txt"
FILE_EXIT_CODE_2="0"
FILE_PATH_2=""
FILE_NAME_3="file3.test.txt"
FILE_EXIT_CODE_3="0"
FILE_PATH_3=""
STD_OUT=""
EXIT_CODE=""
EXPECTED_STD_OUT=`underline "tmp/file1"`$'\nHello from file1.test.txt\n\n'`underline "tmp/file2"`$'\nHello from file2.test.txt\n\n'`underline "tmp/file3"`$'\nHello from file3.test.txt'
arrangeTmp
FILE_PATH_1=$(arrangeFile "$FILE_NAME_1" "$FILE_EXIT_CODE_1")
FILE_PATH_2=$(arrangeFile "$FILE_NAME_2" "$FILE_EXIT_CODE_2")
FILE_PATH_3=$(arrangeFile "$FILE_NAME_3" "$FILE_EXIT_CODE_3")

STD_OUT=`bash "$DIRECTORY_NAME/runCommandForEachFile.sh" "bash" "\\.test\\.txt" "$FILE_PATH_1" "$FILE_PATH_2" "$FILE_PATH_3"`
EXIT_CODE=$?

annihilateTmp

assertEqual "$EXIT_CODE" 0 || exit 5
assertEqual "$STD_OUT" "$EXPECTED_STD_OUT" || exit 6
