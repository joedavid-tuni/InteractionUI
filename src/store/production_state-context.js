// import React, { useEffect, useRef } from "react";
// import PnmlImporter from '../utils/pm4js/importer/importer'
// import { PetriNetTransition, PetriNetArc, PetriNetPlace } from '../utils/pm4js/petri_net';


// const PSContext = React.createContext();

// //create initial PN here
// const fetchProductionTasks = () => {
//     let t = [];
//     fetch('http://127.0.0.1:3005/5624351', { //..05/ + selectedId later create an app-wide state for selected product workplan ID
//         method: 'GET',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//     }).then((response) => {
//         if (response.ok) {
//             return response.text()
//         }
//         throw new Error('Error fetching')
//     }).then((response) => {
//         // console.log(response);

//         let acceptingPetriNet = PnmlImporter.apply(response);
//         console.log(acceptingPetriNet.im.getEnabledTransitions());
//         console.log(acceptingPetriNet.im.getEnabledTransitions()[0].getPostMarking());
//         let enabledTransitions = acceptingPetriNet.im.getEnabledTransitions();
//         return acceptingPetriNet;

//     }).catch(error => console.log(error))
// }



// export const PSContextProvider = async (props) => {
//     const psref = useRef(null);
//     useEffect(() => {
//         const ps = fetchProductionTasks()

//         psref.current = ps
//     },[])



//     return <PSContext.Provider value={psref.current}>{props.children}</PSContext.Provider>
// }

// export default PSContext;