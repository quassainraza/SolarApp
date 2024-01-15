## Marillion Exchange Monorepo

This repository contains the source code for 
- Solar Application
- Investments Application
- Crypto Application

# Stack

## [React Native](https://reactnative.dev)
- Being used for mobile applications within this monorepo
- Material theme taken from [React Native Paper](http://reactnativepaper.com/)
- Routing has been managed by [@react-navigation](https://reactnavigation.org)
- Majorly app uses the context api for managing the states overall

## [React JS](https://react.dev)
- UI library is reactjs as mentioned.
- For UI theme, [Material UI](https://mui.com/material-ui/) is the obvious choice 
- Bundler is [Vite](http://vitejs.dev/) because its development tools performance
- We are using is rust based [SWC](https://swc.rs) compiler

## Fastify
- [Nodejs](http://nodejs.org/) Backend with [Fastify API](http://fastify.dev/)

## How to run

You will need `Nx` installed globally. Follow [this](http://nx.dev/) documentation to set it up.

- Use the format to run app
  ```
  nx start <app-name>
  ```
- In order to start the web based application like admin panels and APIs use
  ```
  nx serve <application-name>
  ```
