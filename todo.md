# TODO

## Knowledge Presentation

- Separate boundary metadata from file metadata (tabs?)
- add a "copy file path" button for all file paths
- highlight selected boundary
- highlight associated boundaries

## Canonical Declarations

- add a subfield to file metadata
  - Ex: Canonical Declaration -> [name, doThing] [type enum] [description, blah blah] [other tag, value]

## Knowledge Graph Upgrades

- show the type of the canonical export
- enforce that all ts files have a canonical declaration
  - add a way to for a file to set itself as ignored
- enforce that all canonical declarations have a block comment
- use a dictionary to find files with nonsense words
  - provide a tag in the comment that includes the non-nonsense name
  - write a rule that enforces that things should have that tag
  - update the nodes to have the  non-nonsense name in parenthesis

## Unknown

- clean up how we find identifiable imports
- enforce that all block comments are associated to a target
- enforce that all line comments follow some known pattern
- enforce that all line comments are associated to something
- create a wrapper util for Case where the case type name is an enum

## File System Rules

- enforce all ts files are in camel case
- enforce that all directories are in kebab case
