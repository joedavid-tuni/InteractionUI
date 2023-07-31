## Store

+ `xx_slice.js`: Redux Slicers that help manage component state.
  - `blinking_slice.js` : handles the blinking of drawn elements on the canvas.
  - `canvas_slice.js` : handles drawing of polygons (projected as intentions) using the Jarvis algorithm on the [canvas](../components/canvas/).
  - `config_slice.js` : handles configuration parameters of the UI (e.g. with and height of elements, etc.).
  - `interactiondrawer_slice.js` : handles state of the interaction panel component ([bottom_slide](../components//bottom_slide/)).
  - `kinect_slice.js` : handles switching on/off the Kinect .
  - `leftdrawer_slice.js` : handles states of the process plan panel component [left_slide](../components/left_slide/).
  - `messagedrawer_slice.js` : handles the messages exchanged between the agents done by the message panel component([im_panel](../components/im_panel/)).
  - `processdescriptiondrawer_slice.js` : handles descrption of product workplans as process plans.
  - `rightdrawer_slice.js` : handles state of the product workplan panel ([right_slide](../components/right_slide/)). This includes the assigning the product workplan.
+ `index.js`: Redux store.
+ `ws-context.js`: uses context to provide WebSocket functionality to the application. This is the entry point for the websockets in the application and contains all immediate behaviour upon receiving data via WebSockets.