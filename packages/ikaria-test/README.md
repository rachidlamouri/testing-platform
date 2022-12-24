# Ikaria Test (ikaria-test)

This is the default test framework. It defines conventions for following the [AAA pattern](../../docs/aaaPattern.md)
using Node and Bash. It does not separate [framework concerns](../../docs/frameworkConcerns.md) by [layer](../../docs/terminology.md#layers),
but it does provide patterns for handling framework concerns using built-in tooling.

## Etymology

[Ikaria wariootia](https://en.wikipedia.org/wiki/Ikaria_wariootia) is one of the oldest bilaterally symmetrical
organisms and is possibly one of the oldest common ancestors for animals today (don't quote me on that I'm not a
biologist). The default testing framework is the only testing platform test framework with an intentional name, as it is
the basis for all other frameworks in the platform. The other frameworks have arbitrary animal names because their order
and purpose are always subject to change, and although the first set of frameworks form a linear progression, the testing
platform is designed to support a tree of branching frameworks that tackle various problems.

## Shell Conventions

### Shell Test Concepts

#### Bash Test File

A file containing a Bash script that follows the ikaria [Bash conventions](#bash-conventions).

#### TypeScript Test File

A file containing TypeScript code that follows the ikaria [TypeScript conventions](#typescript-conventions).

### Shell Orchestration

For Bash tests, run the Bash test file with `bash`. For TypeScript tests, run the TypeScript test file with `ts-node`.

### Shell Reporting

The standard out stream from the process that runs the test file.

### Shell Signaling

The exit code of the orchestration process: 0 is passing, and anything else means failure.

## Bash Conventions

### Bash Orchestration

Uses the Bash runtime model where a script is executed from start to finish.

### Bash Reporting

Use the [report](./bash/report.sh) function which is a wrapper on `printf` to send information to standard out.

### Bash Signaling

Use the Bash [test](https://linuxcommand.org/lc3_man_pages/testh.html) utility to create assertions of the form:
`[<test command> ] || exit n`, where n is greater than 0. It is recommended that all `exit` commands of this form
increment `n` to help identify the source of a failure. By design, this convention will cause a test file to fail on the
first error.

## TypeScript Conventions

### TypeScript Orchestration

Uses the Node runtime model to execute a script from start to finish. Use the [orchestrator](./type-script/index.ts),
an alias for `Promise`, to create a promise chain to group scenarios into separate blocks of code via
`Promise.prototype.then`. This enables the execution of both synchronous and asynchronous code. Do not introduce
branching logic with `Promise.prototype.catch` since, as of Node 16, Node will error immediately on an unhandled promise
rejection. By design, this convention will cause a test file to fail on the first error.

### TypeScript Reporting

Use the [reporter](./type-script/index.ts), an alias for `console`, to send information to standard out.

### TypeScript Signaling

Use the [signaler](./type-script/index.ts), an alias of an [alias](./type-script/assertUtil.ts) of `assert`, to make
assertions. Node's `assert` utility throws Errors which will cause the [orchestrator](#typescript-orchestration) to kill
the process. By design, this convention will cause a test file to fail on the first error.
