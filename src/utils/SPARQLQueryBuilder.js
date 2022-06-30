import config from '../config/config.json';

const DEFAULT_GRAPH_URI = config.KBEPlatform.KBGraphURI;


export const getBasicSelectQuery = (r = "*", s = '?s', p = 'a', o = '?o') => {
    const query = "PREFIX camo:<" + DEFAULT_GRAPH_URI + "#> " +
        "SELECT " + r +
        " WHERE { " +
        s + " " + p + " " + o + ".}"

    return query;

} 