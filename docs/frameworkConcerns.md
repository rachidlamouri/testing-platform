# Framework Concerns

This project identifies multiple high level concerns related to building a [test
framework](./terminology.md#test-framework) that can manifest in one or more [layers](./terminology.md#layers).

## Defining Test Concepts

A test concept is anything that a test framework declares to clarify its internal processes. This includes, but is not
limited to (and does not necessarily have to include):

- a test file
- a test case
- a test subject
- a test hook
- ...etc

## Abstracting Test Concepts

On top of [identifying test concepts](#defining-test-concepts), defining data structures for test concepts can help
separate concerns between layers.

- **agnostic**: holds the schemas for test concepts to allow other layers to only have to interact via a contract
- **syntactic**: the code you write to instantiate a test concept
- **architectural**: all of the functions that transform and process test concepts
- **presentational**: formats serializeable information about a test concept

## Signaling

Signaling is the formal process of identifying the state of a test concept

- **agnostic**: Can hold schemas for abstracting converting signal states between layers
- **syntactic**: how a test developer indicates the pass/fail (or other) state of a test. This is usually done with an
  errorable assertion, however this could also be done by returning a boolean, an enum, a nullable error object etc.
- **architectural**: Can introduce conventions for how a test will be processed and how the result implies the status of
  a test concept
- **presentational**: Formats the status into something that is easy to consume

## Reporting

Reporting means providing serializeable information about a test concept including the signaled status.

- **agnostic**: Can abstract stream or other messaging APIs
- **syntactic**: Defines how a test developer can include domain-specific information that will be added to the test
  output
- **architectural**: Can add conventions that result in additional information getting added to a serializeable test
  concept
- **presentational**: Consumes information reported by other layers to produce a readable output

## Orchestration

- **agnostic**: Any tooling that abstracts processing code. For example, promise utilities that make it easy to sequence
  asynchronous processes.
- **syntactic**: Determines how a test developer can control the order in which tests are run
- **architectural**: Dictates how test concepts are processed at runtime
- **presentational**: Should be able to output test results without affecting the patterns that the architectural layer
  uses
