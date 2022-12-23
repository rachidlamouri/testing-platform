# Arrange, Act, Assert (AAA) Pattern

The AAA pattern makes it easy to write maintainable tests by defining boundaries of concerns within a test. The current
primary goal of the testing platform is to create a testing framework that provides syntax which drives developers to
use the AAA pattern. The testing platform defines more "A"s for the AAA pattern, and provides patterns for abstracting
how a developer semantically defines the parts of a test from how those parts are processed.

## Original Pattern

### Arrange

Set up the context for your tests including, if necessary, instantiating a [subject](./terminology.md#subject), creating
the inputs for your subject, or setting up any state that is expected to change if the subject has side effects.

### Act

Invoke the subject.

### Assert

Make one or more [assertions](./terminology.md#assertion) about the result of the act step, whether it is something
returned by the subject or a side effect.

## AAA in the Testing Platform

Each of the "A"s represent a part of a [scenario](./terminology.md#scenario), and should be implemented as [scenario
hooks](./terminology.md#scenario-hook). Testing frameworks in the testing platform should separate concerns between
writing tests and processing tests. Therefore, scenario hooks should be executed in an order based on their semantics
and not necessarily in the order that they appear in a test.
Frameworks should provide static analysis tooling to help enforce a consistent ordering of hooks.

Lastly, a testing framework can choose to use different terminology to suit its needs, but aliteration is fun.

## More "A"s

### Annihilate

Reset any side effects introduced in the Arrange or Act steps. Other hooks should not have side effects.

### Alter

Transform the result of the act step to facilitate for easier assertions, or more readable assertions. For example, if
you are asserting that a list of objects is returned in the right order, you could instead map the objects to a list of
readible identifiers and assert on the derived list instead.
