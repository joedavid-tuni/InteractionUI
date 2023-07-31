## Components

+ **Interaction panel component** ([bottom_slide](./bottom_slide/)) 

![Interaction panel component](../assets/interaction%20panel%20component.png)

> The interaction panel is a drawer that can be opened by clicking the ‘Perform Communicative Act’ button in the home screen (figure below) to interact with agents in the framework. It allows the operator to separately select and cycle through the message performatives and the (task) context for the message from a list with clickable buttons as necessary for communication.


+ **Canvas Component** ([canvas](./canvas/)) **and Product workplan component** ([right_slide](./right_slide/))

![Canvas and product workplan component](../assets/canvas%20and%20product%20workplan%20component.png)

> **Canvas:** The canvas  allows for free-form drawing by use of the HTML5 Canvas API \cite{canvasAPI}. The objective of this is to allow for spatially projecting shapes on the physical assembly or for visual guidance for the operator, transformed from the part geometry. The full-screen requirement mentioned earlier is to make sure that the projector pixels align with those of the canvas, thus making it easier to draw on it using the computed homographies. Furthermore, the choice of a black background also aids detection of the operator's unilluminated hand as any other colour would interfere with the performance of the hand-detection algorithm. It is necessary to point out that all components are primarily transparent, and it is the colour of the drawings on the canvas that predominantly form the colourful portions of the application outside of the status indicators, hover effects, and any images rendered as described earlier. 

> **Product Workplan** This is a collapsible drawer of adjustable width, drawn from the right that presents a net system in PNML in its equivalent tree structure by selecting it using its identifier in a drop-down list. Each element of the tree is allowed to have colours as background that may be used as indication of the status of the represented element or to seek the operator’s attention. It also has a progress wheel to indicate the current progress towards accomplishment as a percentage.

+ **Message panel component** ([im_panel](./im_panel/))

![Message panel component](../assets/message%20panel%20component.png)

+ **Inner Frame component** ([inner_frame](./inner_frame/))

Component that is a frame which positions the canvas and other components at a targe location corrdinate.

+ **Process plan panel component** ([left_slide](./left_slide/))

![Process plan panel component](../assets/process%20plan%20panel%20component.png)

> This is a collapsible drawer of adjustable width, drawn from the left that, similar to the product workplan panel, allows for a view of a net system expressed in PNML as a tree possibly by selecting it using its identifier in a drop-down list . The upper part of the component may be used for rendering an image. The elements of the tree are selectable, and a detailed description of the selected element may be drawn by clicking on a ‘Fetch Detailed Description button’ that draws open another sub-component from the left. This sub-component should render a SHACL graph as a stack of cards taking into account its semantics described in Chapter

+ **OuterFrame.js**: a container frame.

+ **Overlay.js**: the overlay notifying that the application should be in full screen

+ **Radius.js**: Radius for hover effect close to but not exactly near target component.