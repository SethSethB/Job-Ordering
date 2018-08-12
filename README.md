# Job-Ordering

This function takes an input of jobs formatted as a JSON object. The key:value pairs of the object represent jobs and their dependencies - the child (dependent) job is the key and the parent job is the value. If the value is an empty string the job has no dependecies.

E.g. '{"a": "", "b" : "", "c" : "b"}' represents three jobs - job "c" depends on job "b", jobs "a" and "b" have no dependencies.

jobOrdering returns an array which lists all the jobs in a valid order, ie any parent jobs appear in the array before its dependent child job. In the example above, a valid order would be an array which has "b" indexed before "c", whilst "a" has no dependencies so it can be included anywhere in the result. In this case jobOrdering may return ["a", "b", "c"], ["b", "a", "c"] or ["b", "c", "a"].

Inputs which have circular dependencies or jobs which depend on themselves will throw an error.

## Prerequisites

You will need [node](https://nodejs.org/en/) (v9.8.0) installed, please follow the link for instructions on how to do this.

## Getting Started & Installation

Clone this repository with the following terminal command:

```
git clone https://github.com/SethSethB/Job-Ordering.git
```

Change into the Job-Ordering directory:

```
cd Job-Ordering
```

You will need chai (v4.1.2) and mocha (v5.2.0) installed as dev dependencies for testing, run the following command to install:

```
npm i
```

## Testing

The function test suite can be run using the following command:

```
npm test
```
