# Testing Platform

A project for developing new testing practices and frameworks.

If you're here for the mdd-engine then you can jump to [Engines](#engines), but consider reading about [MDD](#model-driven-development-mdd).

## Model Driven Development (MDD)

### The Process

Model driven development is a software engineering process whereby iterating on your code, and iterating on a model of
your code, are one and the same. The model helps you understand the scope of your code regardless of implementation.
This is a flexible process that allows developers to iterate regardless of their current state, since they either know
their current state via the model, or are actively working towards a model. Lastly, this is **not** model-first
development. Iterating on the model first to set a goal for your implementation, and implementing code that will later
be incorporated into the model, are both valid methods of applying mdd.

### Models

A model is a set of information and processes that bring value to a team. For example, a model could be a visualization
of the project or various constraints on various targets (think beyond the linting we have today) that guarantee that
the project works as intended. It is more than tests and test coverage, but those things can also be included in the
model. The model includes the programs and tooling that accomplishes the aforementioned checks. This means that
developers need to write more code to maintain their code, a seemingly recursive problem. However, maintaining a model
should not incur an additional maintenance cost on the team. Therefore, tooling is required that itself is made with mdd
in mind, so that it can not only model a codebase, but it can also model itself.

### Engines

**note**: This is currently the [mdd-engine](./packages/mdd-engine/)

A tool that helps developers apply MDD is called an mdd-engine. Note the emphasis on **an** engine, as there is no
singular engine that will work for every team.

This particular engine is a pipes and filters engine that makes it easy to operate on large sets of data. It comes with
tools to model programs made with the engine, to understand the structure of a project beyond what current dependency
graphs provide today, and to lint anything. This functionality allows developers to quickly onboard on the tool, onboard
on anything made with the tool, and to enforce project-specific constraints.

It is encouraged that teams fork their own engine, and make it work for them. Eventually common functionality can be
hoisted up to a community driven engine without conflating project-specific concerns, and community concerns.

## Test Frameworks

This project was originally supposed to be a sequence of testing frameworks. The following test frameworks are fairly
old and were developed within another project. I will go back to these frameworks when the mdd-engine is in a stable
state.

- [ikaria-test](./packages/ikaria-test/)
- [rat-test](./packages/rat-test/)
- [mouse-test](./packages/mouse-test/)
