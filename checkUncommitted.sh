echo "Checking for uncommitted files"

if [[ -n $(git status --porcelain) ]]; then
  echo "Error: Found uncommitted files";
  echo "Files:"

  git status --porcelain

  exit 1;
fi

echo "No uncommitted files found"
