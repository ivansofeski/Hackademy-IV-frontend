# TWBIVFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

# Important application upgrade instructions

Major upgrades were implemented after sprint 2. If you want have an older development version, you need to run 
    - `git checkout development`
    - `git pull`
    - `npm install`

then rebase your branches with development

# GIT clone and installation (only for the first start)

Visual Studio Code open in view menu open Integrated Terminal:
- in terminal
    - `git clone https://github.com/munHunger/Hackademy-IV-frontend.git` then
    - `cd Hackademy-IV-frontend` then
    - `npm install` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Application changes after sprint 2

  - Updated angular and its libraries from 4.2.4 to 4.4.4
  - updated angular/cli from 1.3.2 to 1.4.5, and made it updatable.
  - updated angular/material from 2.0.0-beta.10 to 2.0.0-beta.12
  - updated zone.js from 0.8.14 to 0.8.18
  - added webpack as a local dev dependency

  - updated all references to material modules and components to use the new mat namespace in all modules and components

  - moved all material imports in admin module to the shared module
  - moved forms imports from admin module to the shared module
  - moved browser imports from admin module to the shared module
  - removed http import from admin module
  - removed material imports from all spec files as they are imported from the shared module
  - Fixed imports and declaration in the navbar spec file