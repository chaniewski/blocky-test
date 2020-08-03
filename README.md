# Blocky Puzzle

## Solution notes
* For propagating the "click" change, I've used recursion.
* I decided to focus on manipulation of the BlockGrid object instead of DOM, in a real-world scenario the mapping from the model to UI would be solved by using an UI framework (React, Angular...)
* Therefore, the updates to UI are drawn by completely destroying the board and redrawing it from scratch. UI framework would handle incremental updates better. The extra benefit of this approach is that the newly drawn blocks will have IDs that correspond to the grid positions. The cost is rendering the whole page on each click. 
* In the given application skeleton, the blocks didn't use absolute positioning, but were floated by the browser rendering engine using `float: left` css attribute. I have decided to follow this approach, but changed the floats to a flexbox model to get the "gravity" for free.

## To get started

You will need a recent version of [Node]. If you do not have it installed already, we find [nvm] to be a handy script to install and even juggle between versions of Node without too much hassle.

On most projects, we have transitioned into using [Yarn], Facebook's package manager in favour of npm. Either one will do to install and run this project, as well as run its tests.

```sh
yarn
# or `npm install`
yarn start
# or `npm start`
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

Use `yarn test` to run the unit tests on the terminal. `yarn test --watch` will only run test files relevant to changes since your last commit, and rerun them every time you save.

## Task

Clicking on a block should remove (or hide) itself and all blocks of the same colour that are connected to the target element, then allow the blocks above the removed to "fall down". The "gravity" is similar to [Tetris], but every block is its own 1x1 entity. Unlike Tetris, it's clicking on a block that triggers the removal and fall of blocks.

For example, given:

![Initial state](./initial.jpg)

After clicking one of the bottom right blue boxes, it should look like this:

![state 2](./expectedResult.jpg)

[node]: https://nodejs.org/en/ "Node is a JavaScript runtime built on Chrome's V8 JavaScript engine"
[nvm]: https://github.com/creationix/nvm 'Because nobody wants to upgrade and downgrade Node per project'
[yarn]: https://yarnpkg.com/en/docs/install 'Never go full Facebook though'
[tetris]: https://en.wikipedia.org/wiki/Tetris "You've played Tetris, right?"
