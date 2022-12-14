# Node CLI - Starter pack and beginner friendly-introduction

The only requirement is that you have some basic knowledge of programming fundamentals and javascript, es6 might help, but not necessary.

## Contents

1. [What does this provide?](#what-does-this-provide)
1. [Configuration and setup](#configuration-and-setup)
1. [Examples](#examples)
   1. [Introduction](#introduction)
   1. [Templates](#templates)
   1. [Typesafety](#typesafety)
   1. [Tested cli interactions](#tested-cli-interactions)
   1. [Automation tricks](#automation-tricks)
      1. ["Faster" typecheck and logging the result](#faster-typecheck-and-logging-the-result)
1. [Tech stack and requirements](#tech-stack-and-requirements)

## What does this provide?

[Back to the contents](#contents)

A starter point into the CLI world for node, without some complex frameworks or local/private installations/distributions.
Just some scripting, a couple of `.mjs` files, and even some type safety into it.

This is meant to show the possibilities and provide some pieces of the bigger picture, it is up to you how you put them together

## Configuration and setup

[Back to the contents](#contents)

I'm using [`pnpm`](https://pnpm.io/es/), [`npm`](https://www.npmjs.com/) or [`yarn`](https://yarnpkg.com/) will also do the job.

You don't have to, but typescript is installed, and for the complete run, you'll have to install it, you can do so by:

```bash
pnpm install # or npm or yarn
```

Scripts and entrypoints are executed via `pnpm`, you can replace them, and most can be executed like:

```bash
pnpm run [script] [...args] # or npm or yarn
```

## Examples

[Back to the contents](#contents)

### Introduction

[Back to the examples](#examples)

My recomended script order:

1. [JS Hello world](./scripts/js-hello-world.js)
1. [With imports](./scripts/with-imports.mjs)
1. [Hello name](./scripts/hello-name.mjs)
1. [CLI Args parser](./scripts/args-parser.mjs)
1. [EZ Write to file](./scripts/ez-write-to-file.mjs)
1. [Write to file](./scripts/write-to-file.mjs)
1. [Faster TSC](./scripts/faster-tsc.sh)
1. [Type safe](./scripts/type-safe.mts)
1. [Hello name with TypeScript](./scripts/hello-name.mts)

### Templates

[Back to the examples](#examples)

Creating almost similar structures by copying and pasting folders is prone to error, mistakes, or simply, oversights.
Automating that process can be crucial in bigger apps with more complex structure, even more so if the architecture is complex and you want to assure quality.

You can do so by defining templates, and how you'd like them to interact with, what should be done before creating them, and after.

Different frameworks use different files, extensions, structures, and projects and teams define the overarching architecture of it's elements, thus, it's up to you how the structure should actually be implemented.

You can even add different set of (initially failing) tests, services, queries and many more...

### Typesafety

[Back to the examples](#examples)

It's easy to fall under the pit of writting scripts in pure javascript, or commonjs, and variants. It's not a bad thing _per se_ but it could be improved, and it should on bigger CLIs.

Typesafety could be achieved by simplify transpiling the content. I'd recomend using `.mts` that would transpile to `.mjs`, as to maximize the JS ecosystem in newer versions and be able to import/export utilities.

In case the utilities you're using are in Javascript, and migrating them might be too much, you could **declare** it's content with a module declaration file (`.js` -> `.d.ts`, `.cjs` -> `.d.cts`, `.mjs` -> `.d.mts`).

### Tested cli interactions

[Back to the examples](#examples)

At times we write code, that we don't test, and we should. CLIs are no exception and actually are a great use case and example.

Not everything in a CLI should be tested, i.e. saving a file, you'd be testing the actual system, but you could check the contents of that file looking for some specific change, even though it would be "slower", it could be necessary.

### Automation tricks

[Back to the examples](#examples)

Manually saving the output to a log, checking some details about the system (referent to the project), a custom update script

#### "Faster" typecheck and logging the result

[Back to the automation tricks](#automation-tricks)

It's not really faster, literally, but it will seem like it, instead of visually logging the output, just save it into a file, it's almost always much faster.
Plus, the advantage of having a log file you can always check as a point of reference

```bash
pnpm run faster-tsc
```

It will generate a log with the typescript errors, if any

## Tech stack and requirements

[Back to the contents](#contents)

Tech stack:

- Node
- Typescript
- Vitest (testing) and coverage packs

Requirements:

- Node v18.5.0
- NPM 8.12.1 (not used directly)
- PNPM 7.18.1 (Node Agent, should also work with NPM and YARN)
