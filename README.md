# Interaction UI

[![CC BY 4.0][cc-by-shield]][cc-by]

This git repository contains supplementary material to the Doctoral Dissertation of Joe David, "_A Design Science Research Approach to Architecting and Developing Information Systems for Collaborative Manufacturing: A Case for Human-Robot Collaboration_". 

> **Note**: For other (dissertation) related git repositories, see the meta git repository [here](https://permanent.link/to/jd-doctoral-dissertation/meta-repository).

This repository is essentially a [React](https://react.dev/) project that implements a purpose-built web application tailored to the needs of its use as a projected mixed-reality user interface.
## Pre-requisites

To use this repository in the way it was intended to be, the following are needed:
+ a computer capable of running a web-browser (e.g. RPi)
+ [React](https://react.dev/) and npm ([Node.js](https://nodejs.org/en/download)) installed
+ a projector.
+ web server maintained in a separate [repository](https://permanent.link/to/jd-doctoral-dissertation/web-server) that interface with the Interaction UI via [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

 To understand the source code an understanding of the following are required:
 + React Hooks (`useEffect`, `useContext`, `useRef`, `useState`), Context API.
 + State management with Redux.
 + HTML and Cascading Style Sheets (CSS).
 + JavaScript

## Getting Started

Once the pre-requisistes are satisfied the project can be run using the start script via the following command in a terminal `npm start `. `index.js` is the entry point of the application and `App.js` is the first user-defined component.

## Components

> **Note:** An explanation of the main components are found in Chapter 5 of the Dissertation that makes use of an alias for some components to better suit the application case study. The names of the component in the git repo are given in the paranthesis below alongside the alias.

The five main components are:

1. Product workplan panel component ([right_slide](src/components/right_slide/))
2. Process plan panel component ([left_slide](src/components/left_slide/))
3. Interaction panel component ([bottom_slide](src/components/bottom_slide/))
4. Message panel component ([im_panel](src/components/im_panel/))
5. Canvas component ([canvas](src/components/canvas/))

These components are shown in the figure below and explained in more detail in their respective folders and as comments in the source code.

![The interface of the Interaction UI](/src/assets/UI%20(components).png)


## Citation

Under the included [LICENSE](./LICENSE), if you use or extend the application, especially in an academic context, please cite. You can click "Cite this repository" on the right sidebar to copy both `APA` and `BibTeX` formatted citation.

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License][cc-by]. You can find the included license [here](./LICENSE).

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg





