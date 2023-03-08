import { createSlice } from "@reduxjs/toolkit";

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
          // polygon.color = data.color;
  
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
      },
      remove: (state,actions)=>{

        state.polygons = state.polygons.filter((polygon)=>polygon.name!=actions.name)
      }
    }
  });

  export const canvasActions = canvasSlice.actions;
  export default canvasSlice.reducer;