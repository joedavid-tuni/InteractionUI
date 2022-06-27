import { configureStore } from "@reduxjs/toolkit";

import blinkingReducer from './blinking_slice';
import canvasReducer from './canvas_slice';
import configReducer from './config_slice';
import interactionReducer from './interactiondrawer_slice'
import leftDrawerReducer from './leftdrawer_slice';
import rightDrawerReducer from './rightdrawer_slice';
import messageDrawerReducer from './messagedrawer_slice';

const store = configureStore({
  reducer: {
    leftSlide: leftDrawerReducer,
    rightSlide: rightDrawerReducer,
    bottomSlide: interactionReducer,
    imPanel: messageDrawerReducer,
    blinking: blinkingReducer,
    canvas: canvasReducer,
    config: configReducer,
  }
});

export default store;