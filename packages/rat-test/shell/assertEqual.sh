function assertEqual() {
  ACTUAL=$1
  EXPECTED=$2

  if [ "$ACTUAL" = "$EXPECTED" ]; then
    return 0
  else
    echo "Actual:"
    echo "$ACTUAL"
    echo ""
    echo "Expected:"
    echo "$EXPECTED"
    return 1
  fi
}
