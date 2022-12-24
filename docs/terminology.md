# Terminology

## Test Framework

A test framework is a set of tooling, patterns, and processes for testing code.

## Layers

A layer encompasses a set of related concerns that should be orthogonal to other layers. So far, the testing-platform
has identified four layers:

- **syntactic**: Concerns related to writing tests
- **architectural**: Concerns related to running and processing tests
- **presentational**: Concerns related to displaying test results
- **agnostic**: This is a meta-layer to hold code that can be abstracted away from the concerns of the other layers. For
  example, this library introduces tooling to assert that something did or did not throw an error, which is not bound by
  the concerns of the other layers.
- **transgressing**: This is a meta-layer for code that crosses the boundaries of other layers. Earlier frameworks will
  have conventions that cross layer boundaries, but later frameworks will separate these concerns.

**note**: IMO the following should not be considered "layers". I'm documenting them as part of the current definition of
"layer", so I can iterate on it. My reasoning is that the four layers above can all exist within the two not-layers
below.

- **shell**: Concerns related to files and processes including process streams and exit codes
- **node**: Concerns related to the node runtime environment. This overlaps with some of the "shell" layer concerns, but
  with how they exist in the node runtime environment.

**note**: The following item was not included in the original scope of "layers", but in working on the testing platform
I wanted to capture its definition so I can figure out where it belongs

- **test**: There is a set of tools that are made for the tests of tooling that are made for specific layers. For
  example "normalizeErrorStack" is a utility for removing dynamic error information from an Error message, such as the
  filepath and line number in the stack trace. This utility is only used to test utilities that modify error messages
  (yes it's hacky, but that's a separate issue). So I wanted to capture the set of concerns that are "testing platform
  test file concerns" and should not be included in published code.

## A Testing-Platform Test Framework

A testing platform test framework is a [test framework](#test-framework) that intersects one or more [layers](#layers)
with one or more [framework concerns](./frameworkConcerns.md) in the spirit of iterating towards the [driving
goal](../README.md#description) of the testing platform.

## Subject

A thing under test. Subjects can have subjects, such as the methods on a class, or the function returned by a higher
order function.

## Scenario

A single situation that tests an aspect of a subject. Scenarios can share logic, but they should not share mutable
state.

## Scenario Hook

Logic related to one aspect of a scenario such as setup, teardown, invoking the subject or making an assertion.

## Assertion

A statement about something. Also refers to an implementation of such a statement.

## Scenario Assertion

The description and implementation of an assertion within a scenario. This term helps decouple assertion library
specifics from the architecture of a testing framework.

## Scenario Group

A collection of scenarios with a describeable similarity. A scenario group should not have any logic, but it's scenarios
would be expected to have similar logic or use the same utilities.
