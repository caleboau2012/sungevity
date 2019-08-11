# Sungevity Assessment

## Pre-requisites

- npm
- NodeJS

## Set up instructions

- `cd` to the directory of your choice

- `git clone https://github.com/caleboau2012/sungevity`

- `cd sungevity`

- `npm i`

- `npm start`

## Tests

To test this, simply run `npm test`

## Demo

If all goes well, visit http://localhost:3000/, you should see a brief landing page.

You should see something like this
https://sungevity-caleb.herokuapp.com/

Feel free to change the difficulty levels.
Have fun.

## TODO

Here are some shortcomings in my solution and a few things that can be improved on:

- **Clarification on edge cases:**
  - For getting the recent items in a week, given the lack of a time ordered list of posts, I opted to utilise the /v0/newstories endpoint in the source feed however, I observed that the entries here do not date back to 7 days. The only way to get entries and respect dates is to query every item id for its contend and then check the date but I observed that comments do not contain titles. I also observed that many items are comments and that there have been more recent comments lately than in the past and this was dragging this operation beyond regular http limits even when asynchronous.
  - The api does not provide an endpoint to fetch users without knowing their ids. I opted to use the best stories as an alternative (after studying API) with the hope that the users with karma over 10000 will lie somewhere in these stories.
- **Break solution up into smaller components:** The solution as is is not very modular and can be made even better with more comments to help any developer who will need to work on this.
- **Unit tests:** I propose adding more tests to the test suite. I only put in a few tests due to time constraints. The current tests (especially the /users-with-10000-karma endpoint) times out sometimes due to the number of requests it makes in the background. Optimising this would require a data store to have stored this information so that it is simply returned when queried.

## NOTES

https://docs.google.com/document/d/1CuHnahz1Ch_tEGMm_Twwhbyr3Un9kc-wqUSLzk0XizI/edit#
