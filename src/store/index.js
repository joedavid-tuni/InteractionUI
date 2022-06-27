import { configureStore, createSlice } from "@reduxjs/toolkit";

const leftSlideSlice = createSlice({
  name: "leftSlide",
  initialState: {
    isOpen: false
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    }
  }
});

const rightSlideSlice = createSlice({
  name: "rightSlide",
  initialState: {
    isOpen: false,
    tree: []
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    setTree(state, actions) {
      state.tree = actions.payload;
    }
  }
});

const bottomSlideSlice = createSlice({
  name: "bottomSliede",
  initialState: {
    isOpen: false
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    }
  }
});

const imPanelSlice = createSlice({
  name: "imPanel",
  initialState: {
    isOpen: false,
    imData: {}
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    setImData(state, actions) {
      state.imData = actions.payload;
    }
  }
});

const blinkingSlice = createSlice({
  name: "blinking",
  initialState: {
    blinkingState: true
  },
  reducers: {
    toggleBlinkingState(state) {
      if (state.blinkingState === true) {
        state.blinkingState = false;
      } else {
        state.blinkingState = true;
      };
    }
  }
});

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    polygons: []
  },
  reducers: {
    handleInput: (state, actions) => {
      let data = actions.payload

      const orientation = (p, q, r) => {
        let val = (q.y - p.y) * (r.x - q.x) -
          (q.x - p.x) * (r.y - q.y);

        if (val === 0) return 0;
        return (val > 0) ? 1 : 2;
      }

      const convexHull = (points) => {
        let n = points.length;

        if (n < 3) return;

        let hull = [];
        let l = 0;

        for (let i = 1; i < n; i++) {
          if (points[i].x < points[l].x) l = i;
        }

        let p = l, q;
        do {
          hull.push(points[p]);
          q = (p + 1) % n;

          for (let i = 0; i < n; i++) {
            if (orientation(points[p], points[i], points[q]) === 2) q = i;
          }

          p = q;
        } while (p !== l);

        return hull;
      }
      const getPolygonByName = (name) => {
        for (let polygon of state.polygons) {
          if (polygon.name === name) {
            return polygon;
          }
        }
      }

      let polygon = getPolygonByName(data.name);

      if (polygon === undefined) {
        // Add new polygon
        polygon = data;
        polygon.points = convexHull(polygon.points);

        state.polygons.push(polygon);
      } else {
        // Update existing polygon
        polygon.points = convexHull(data.points);
        polygon.mode = data.mode;
        polygon.color = data.color;
      }
    },
    changeBlinkingState: (state, actions) => {
      const getPolygonByName = (name) => {
        for (let polygon of state.polygons) {
          if (polygon.name === name) {
            return polygon;
          }
        }
      }

      let polygon = getPolygonByName(actions.name);
      polygon.mode = actions.mode;
    },
    changeColor: (state, actions) => {
      const getPolygonByName = (name) => {
        for (let polygon of state.polygons) {
          if (polygon.name === name) {
            return polygon;
          }
        }
      }

      let polygon = getPolygonByName(actions.name);
      polygon.color = actions.color;
    },
    changeMode: (state, actions) => {
      const getPolygonByName = (name) => {
        for (let polygon of state.polygons) {
          if (polygon.name === name) {
            return polygon;
          }
        }
      }

      let polygon = getPolygonByName(actions.name);
      polygon.mode = actions.mode;
    }
  }
});

const configSlice = createSlice({
  name: "config",
  initialState: {
    radius: {
      caButton2: 0,
      cancelButton: 0,
      receiverButton: 0,
      sendButton: 0,
      taskButton: 0,
      actionButton: 0,
      caButton: 0,
      arrow: 0,
      updateButton: 0,
      stopStartButton: 0,
      settingsButton: 0
    },
    innerFrame: {
      left: 100,
      top: 50,
      width: 1100,
      height: 600
    },
    dragBarsWidth: 10,
    arrowHeight: 80,
    treeView: {
      height: 80,
      fontSize: 20
    },
    rightSlideDefaultWidth: 300,
    leftSlideDefaultWidth: 300
  },
  reducers: {
    updateConfig: (state, actions) => {
      state.radius = actions.payload.radius;
      state.innerFrame = actions.payload.innerFrame;
      state.dragBarsWidth = actions.payload.dragBarsWidth;
      state.arrowHeight = actions.payload.arrowHeight;
      state.treeView = actions.payload.treeView;
      state.rightSlideDefaultWidth = actions.payload.rightSlideDefaultWidth;
      state.leftSlideDefaultWidth = actions.payload.leftSlideDefaultWidth;
    }
  }
});


const handleWSMessageSlice = createSlice({
  name: "message",
  initialState: { type: null, values: null },
  reducers : {
    requestScreenParams(){

    },
    updateTree(){

    },
    drawOnCanvas(){

    },
    handleIMMessage(){

    }
  }

});

const store = configureStore({
  reducer: {
    leftSlide: leftSlideSlice.reducer,
    rightSlide: rightSlideSlice.reducer,
    bottomSlide: bottomSlideSlice.reducer,
    imPanel: imPanelSlice.reducer,
    blinking: blinkingSlice.reducer,
    canvas: canvasSlice.reducer,
    config: configSlice.reducer,
    message: handleWSMessageSlice.reducer 
  }
});

export const leftSlideActions = leftSlideSlice.actions;
export const rightSlideActions = rightSlideSlice.actions;
export const bottomSlideActions = bottomSlideSlice.actions;
export const imPanelActions = imPanelSlice.actions;
export const blinkingActions = blinkingSlice.actions;
export const canvasActions = canvasSlice.actions;
export const configActions = configSlice.actions;
export const handleMessageActions = handleWSMessageSlice.actions;

export default store;