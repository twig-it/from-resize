[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# From Resize

We all love using CSS Flex and Grids. However, in certain cases, a change in Dom container dimension may require its content to be redrawn. To address such uses cases, [Resize Observer Specification](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) was published. Resize Observer is now widely [supported in modern browsers](https://caniuse.com/?search=resize%20observer).  

However, In the age of [RxJs Observables](https://github.com/ReactiveX/rxjs), I find the API for Resize Observer a bit cumbersome to use. So I thought, it would be nice to build an RxJs wrapper around this API. 

## Advantages
- Returns an Observable that emits on every container dimension change
- You can set the watch direction to be `Horizontal`, `Vertical` or `Both`.
- Set an initial debounceTime to control the emit frequency
- React on first load using `emitOnStart`
- Harness the power of [RxJs Operators](https://rxjs.dev/guide/operators) to do wonders!

## Installation

Checkout github packages for instructions.

### Download @twig-it artifacts from Github Packages
- Create an `.npmrc` file in your repo
- Add @twig-it:registry=https://npm.pkg.github.com
- Create a PAT that has read access to Github Packages. Let's call this token `GPRead`
- Set this token in npm for your CI runs. Example below:
   ```
    - name: Npm Install
        run: npm config set '//npm.pkg.github.com/:_authToken' "${GPRREAD}" && npm ci
        env:
          GPRREAD: ${{ secrets.GPREAD }}

   ```
      
## Example:

An Example usage where `from-resize` will be useful.
- An SVG/Canvas chart inside an HTML container
- After initial render, the dimension of this HTML container changes without a window resize event.
- This requires us to redraw the chart. To do this, we need to watch the container for dimension changes and then redraw.

## Demo

Checkout [Demo page!](https://twig-it.github.io/from-resize/)

## Api Docs

Checkout [Api docs!](https://twig-it.github.io/from-resize/types/index.html)
