import './SPARQLQueryBuilder'
import config from '../config/config.json'

export const fetchQuery = async (query) => {
    console.log("Fetching query", query)
    const url = new URL("http://" + config.MainPlatform.IP + ":" + config.MainPlatform.OperatorFuseki + "/ds/query");
    const params = { 'query': query }
    url.search = new URLSearchParams(params).toString();
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export const fetchFromEntServer = async (route, body) => {

    const response2 = await fetch('http://127.0.0.1:3005/' + route, {
        method: 'POST',
        headers: {
          'content-type': 'text/plain'
        },
        body : body
      });

      const data2 = await response2.text();
      let t = [];

      console.log(data2);

    return
}