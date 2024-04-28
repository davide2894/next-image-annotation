# Next Image Annotation

Minimalistic Image Annotation tool for the web

## Technologies used

Here are the technologies being used

- [Next.js](https://nextjs.org/) as the core framework
- [React](https://react.dev/) as the rendering library
- [React DOM](https://github.com/facebook/react/tree/main/packages/react-dom): this is the `React` package that acts as a bridge between `React` itself and the `DOM`, so it makes possibile to render `React` components into a web page's [DOM](https://www.w3.org/TR/WD-DOM/introduction.html) by using `React`'s own `virtual DOM` and diffing algorithm
- [Redux Tooklit](https://redux-toolkit.js.org/) as the main tool to store a global state object across the entire application
- [Typescript](https://www.typescriptlang.org/) as the safety layer above JavaScript, to ensure less errors during development
- [Css modules](https://github.com/css-modules/css-modules) as the main tool to develop modular style with unique component-centered classes

This project uses [react-rnd](https://github.com/bokuweb/react-rnd) to integrate drag and resize functionalities

## Getting Started

1. Run `npm i`to install all the dependencies
2. Once installted, you can run `npm run dev` to start the local server on `http://localhost`. The default port used will be 3000, otherwise another if it is already occupied by another process
3. Other useful commands:
   - create a production build (useful to check for any error before creating a commit): `npm run build`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
