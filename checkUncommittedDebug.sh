# TODO: make "debug" a constant that is tied to the ProgramFileCache constant
# TODO: make "git status --porcelain debug" a reusable function or something
echo "Checking for uncommitted files in 'debug'"

if [[ -n $(git status --porcelain debug) ]]; then
  echo "Error: Found uncommitted files";
  echo "Files:"

  git status --porcelain debug

  exit 1;
fi

echo "No uncommitted files found"
