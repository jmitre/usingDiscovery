# Finishing the Students API

## Approach

In this exercise, you will complete, using TDD, an API for serving student data. What is included in this repository is a ["happy path"](https://en.wikipedia.org/wiki/Happy_path) implementation for the following routes:

  1. `GET /students`
  1. `POST /students`

### Setup steps

Before beginning, make sure to run `npm install`. To verify that things are setup correctly, you can run the provided tests.

## Problems

1. Complete the remaining RESTful API actions.
1. In the provided sample code, only tests to cover the "happy path" exist. What this means is that the code itself is not robust. Improve the robustness of the code by adding the test cases for failure.
1. [stretch] Realistically an API would likely have some type of security measure, one way of doing this is to have users provide an authentication token provided as a header value, another is to simply include it as a query string parameter in the request itself, although that is likely not the best option. Here is a guide of [REST API security practices](https://www.owasp.org/index.php/REST_Security_Cheat_Sheet) just for reference. Your challenge is to add a simple authentication mechanism API using TDD. For simplicity, you can just create an "account" entity directly in your tests (and development database).
1. [stretch] Suppose that a new version of the system must be released where students have a `birthdate` attribute as well. However, the problem is that clients of the existing API do not anticipate this field, so the acceptance criteria makes you decide that [_versioning the API_](http://www.troyhunt.com/2014/02/your-api-versioning-is-wrong-which-is.html) is the best idea. Implement a versioned API using any versioning strategy of your choice that does not break comptability. As always, use TDD to drive this process.

## Reflection

Stop a few minutes before the end of the day and, working with your pair, answer the following questions:

1. Where did TDD help you? Were you able to use errors from failing tests to help drive the development?
1. How many test cases did you identify as you worked through this problem?
1. Was the effort involved to build out a REST API more or less than you anticipated?
1. Did you use any pairing techniques that we have seen in the past?
1. Say one positive thing to each other about pairing.
