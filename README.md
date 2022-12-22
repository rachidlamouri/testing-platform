# Testing Platform

Testing frameworks on testing frameworks.

**note**: This project is under active development and is subject to change. It has not been officially released yet.

## Description

This project is an exercise in building a testing framework from the ground up with as few production and developer
dependencies as possible. It is built with a specific end goal in mind:

> Create a testing framework that decouples the syntactic concerns of writing tests with the architectural concerns of
> processing tests, while enabling test scenarios to independently maintain their own contexts.

However, as one can expect, building a testing framework requires building functionality, which in turn, requires
writing tests. Therefore, the testing-platform is a collection of testing frameworks where each framework iteratively
solves a unique problem to make it easier to develop more complex frameworks. The initial framework is a set of
conventions for writing and running tests that attempts to only use built in `node` and `bash` functionality. Using this
initial framework, we can build and test ESLint rules to enforce the conventions of the initial framework, and also
build a slightly more complex framework. Using this method we can slowly build up to the aforementioned desired
framework.

## Guiding Principles

- **Know your scope**: This is a passion project driven by a desire to build a sound monorepo, learn more about testing,
  and to facilitate development of my other projects. As much as I'd love to integrate this project with work, or
  publish it to npm from the get-go, I wish to avoid having monetary and external concerns supercede the core principles
  of this project.
  - I would love to officially release this project some day when I can clearly demonstrate that it's not just [another
    testing library](https://xkcd.com/927/)
- **TypeScript first**: To help narrow the scope of this project, I have decided to make this a TypeScript-first
  project. That is, it will not support edge cases that may occur in a JavaScript-only environment. This helps us remove
  unnecessary code, and keep the project focused on scenarios that can happen if a project is maintained with good
  tooling.
  - My background is in full stack JavaScript and TypeScript development, so most of my side projects are in TypeScript.
    I do want to set an example of how to build a robust testing framework regardless of language, but I'm also trying
    to set realistic expectations.
- **It's ok to rediscover the wheel**: Some of my best learning experiences have come from trying to solve problems that
  have already been solved. In doing so, you learn why those solutions came to be, and if the constraints that resulted
  in those solutions are still in the way today.
- **Don't use existing test frameworks**: The testing-platform is trying to solve pain points with some existing testing
  frameworks, therefore using those frameworks to test this framework could result in a bias towards the conventions and
  patterns of those frameworks.
- **Prefer discoverable conventions**: Conventions can improve developer productivity, but they can also hinder the
  developer experience with a wall of magic. This project aims to use static analysis tooling (eg. ESLint) to highlight
  patterns that go against the project's conventions, and to link to documentation explaining why the convention exists
  and how to resolve any errors.
- **Don't worry about a convention until it's enforceable**: Along with the above point, this project may introduce
  undocumented conventions, but those conventions won't be considered standard until they can be enforced through
  tooling. Don't waste time trying to check something the computer can check for you.
- **Identify and separate testing concerns**: To accomplish the [core goal](#description) of this project, we want to
  identify and separate the [framework concerns](./docs/frameworkConcerns.md) that go into building a
  testing framework
- **A sound monorepo**: Ideally the testing platform will contain a lot of tooling to aid in the development process.
  There should be a definitive sequence in which to perform all checks so that any developer can pinpoint which system
  is the root cause of a failure. We will include ways to run all checks in parallel and in dependent order to
  facilitate various needs. Running checks in dependent order prevents circular dependencies that are built with the
  testing-platform, and allows us to be realistic about the scope of the parts of the testing platform. For example, if
  we have to build the ESLint rules for a test framework with the framework itself, then the rules can't be run against
  the framework until the framework tests have run to completion without errors. This helps us have a workable solution
  to what is otherwise a chicken and an egg problem.

## Monorepo Packages

As stated before, this repository will contain several test frameworks that each aim to solve a different problem, and
to faciliatate the development of more complex frameworks. Frameworks have been assigned arbitrary animal names. I'm
avoiding using numbers or the alphabet to imply the order of these frameworks since they may get shuffled around every
so often. Furthermore, my personal goals with this platform are to create a linear sequence of frameworks to achieve my
end goal, but in the future, that linear sequence could easily become a tree of frameworks with slighlty different end
goals. And yes, I acknowledge that future proofing my naming structure does not follow the principle of narrowing scope.

### Ikaria Test (Default Test)

This framework defines conventions and a handful of bash scripts for using the built in functionality of node and bash
to write TypeScript tests. Includes a bash script to run multiple test files, but it stops at the first failure.

### Rat Test

This is a facade on the built-in utilities to introduce some of the terminology defined in [framework
concerns](./docs//frameworkConcerns.md)

### Mouse Test

Abstracts having to directly call the function responsible for reporting test information from within a test scenario.

### Fox Test

Enables running multiple test files without having to stop at the first failed file. Each file will still stop at its
own first failure.

### Dog Test (WIP)

**note**: Its current implementation almost matches this definition

Enables running all test scenarios in a single file without having to stop at the first failure.

### Parrot Test (TBD)

**note**: The current implementation of this framework is severely out of date

### Octopus Test (TBD)

**note**: The current implementation of this framework is severely out of date

## Comparisons to Existing Frameworks

TBD

**note**: I want to make sure I do more thorough research before I explain the pros and cons of the testing-platform. So
far I have only used [mocha](https://mochajs.org/) and [jest](https://jestjs.io/), and I've done some brief research
into [node-tap](https://www.npmjs.com/package/tap).
