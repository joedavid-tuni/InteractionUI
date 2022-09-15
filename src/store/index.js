import { configureStore } from "@reduxjs/toolkit";

import blinkingReducer from './blinking_slice';
import canvasReducer from './canvas_slice';
import configReducer from './config_slice';
import interactionReducer from './interactiondrawer_slice'
import leftDrawerReducer from './leftdrawer_slice';
import rightDrawerReducer from './rightdrawer_slice';
import messageDrawerReducer from './messagedrawer_slice';
import workplanReducer from './workplan-slice';
import processDescriptionReducer from './processdescriptiondrawer_slice'

const store = configureStore({
  reducer: {
    leftSlide: leftDrawerReducer,
    processDescripion : processDescriptionReducer,
    rightSlide: rightDrawerReducer,
    bottomSlide: interactionReducer,
    imPanel: messageDrawerReducer,
    blinking: blinkingReducer,
    canvas: canvasReducer,
    config: configReducer,
    workplan: workplanReducer
  }
});

export default store;