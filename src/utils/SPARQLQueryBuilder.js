import config from '../config/config.json';

const DEFAULT_GRAPH_URI = config.KBEPlatform.KBGraphURI;

export const getPrefixStatements = (...prefixes) => {
    const prefix_map = {
        "camo": "https://joedavid-tuni.github.io/ontologies/camo",
        "xsd": "http://www.w3.org/2001/XMLSchema",
        "DUL": "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl",
        "sh": "http://www.w3.org/ns/shacl",
        "cm": "http://resourcedescription.tut.fi/ontology/capabilityModel",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema",
        "nguri": "https://joedavid91.github.io/ontologies/camo-named-graph/operator-intention",
        "owl":"http://www.w3.org/2002/07/owl"
    };

    let separator = "";
    let prefixString = "";

    for(const prefix of prefixes){
        prefix == "nguri" ? separator = "" : separator = "#";
        prefixString+= "PREFIX " + prefix + ":<" + prefix_map[prefix] + separator +  "> ";
    }

    return prefixString;

}


export const getBasicSelectQuery = (r = "*", s = '?s', p = 'a', o = '?o') => {
    const query = "PREFIX camo:<" + DEFAULT_GRAPH_URI + "#> " +
        "SELECT " + r +
        " WHERE { " +
        s + " " + p + " " + o + ".}"

    return query;

}

export const getBasicSelectWithIDQuery = (r = "*", s = '?s', p = 'a', o = '?o') => {
    const query = "PREFIX camo:<" + DEFAULT_GRAPH_URI + "#> " +
        "SELECT " + r +
        " WHERE { " +
        s + " " + p + " " + o + "." +
        s + " camo:UID " + "?id" + ".}"

    return query;

} 

export const getCurrentProductionTasksQuery = ()=>{  
    const query = getPrefixStatements("camo") + `SELECT DISTINCT ?task1 ?id ?desc
    WHERE  {    
                {
                ?task1 a camo:ProductionTask.
                ?task1 camo:UID ?id.
                ?task1 camo:hasHRDescription ?desc.
                ?state camo:includesActivity ?task1.
                ?state camo:hasToken true.
                }
                MINUS {
                    ?state1 camo:hasToken true.
                    ?state2 camo:hasToken false.
                    ?state1 camo:includesActivity ?task1.
                    ?state2 camo:includesActivity ?task2.
                    filter ((?task1=?task2))
                }   
    }`
      return query;
}

export const getProcessClassAndPerformedComponent = (task)=>{  
    const query = getPrefixStatements("camo","owl") + `
    SELECT ?capClass ?comp ?desc WHERE {
        camo:` + task + ` a ?capClass.
        camo:` + task + ` camo:isPerformedOnProductComponent ?comp.
        FILTER (!sameTerm(?capClass, owl:NamedIndividual))
    }
    `
      return query;
}



export const getCurrentDesires = ()=>{ // Not used, doesnt follow the same query pattern as Robot
    const query = getPrefixStatements("camo", "nguri") + `SELECT ?task ?id
    WHERE  { 
        ?task camo:UID ?id 

        //TODO: DO THE FIRING HERE AND CHECK THE INTENTIONS IN THE NAMED GRAPH
        GRAPH nguri:
        {
            ?task a camo:AchievableDesire.
            FILTER NOT EXISTS {
                ?task a camo:NonAchievableDesire.
            }

            FILTER NOT EXISTS {
                ?task a camo:ConflictingDesire
            } 
        }
    }`
    return query;
}

export const getIDofProcessPlanOfProductionTask = (productionTask)=> {
    const query = getPrefixStatements("camo") +
    `
    SELECT ?ppid WHERE {
        camo:`+productionTask+` camo:hasProcessPlan ?pp.
        ?pp camo:UID ?ppid.
    }
    `
    return query;
}

export const getProcessDescrptionQuery = (processPlanName) => {
    const query = getPrefixStatements("camo") + 
    `
    SELECT ?shape WHERE { 
    camo:`+ processPlanName + ` camo:hasProcessDescription ?cap. 
    ?cap camo:hasShape ?shape.}
    `
    return query;
}

export const getPartOfProcessTask = (processPlanName) => {
    const query = getPrefixStatements("camo") + 
    `
    SELECT ?part WHERE { camo:` +processPlanName + ` camo:isPerformedOnProductComponent ?part. }
    `
    return query;
}