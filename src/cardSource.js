import { BASE_URL } from "./scryfallAPI";

function treatHTTPSResponseACB(resp){
    if(!resp.ok){
        throw new Error("API problem " + resp.status);
    }
    return resp.json();
}

function transformSearchResultACB(object){
    return object.data;
}

function callAPI(endpoint){
    return fetch(BASE_URL + endpoint, {
        "method": "GET"
    }).then(treatHTTPSResponseACB);
}
function getListAPI(endpoint, obj){
    const nameObject =  {identifiers : []}
    obj.forEach(element => {
        nameObject.identifiers.push({name : element})
    });
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nameObject)
      };
    return fetch(BASE_URL + endpoint, requestOptions).then(treatHTTPSResponseACB)
}
function getListAPIid(endpoint, obj){
    const nameObject =  {identifiers : []}
    obj.forEach(element => {
        nameObject.identifiers.push({id : element})
    });
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nameObject)
      };
    return fetch(BASE_URL + endpoint, requestOptions).then(treatHTTPSResponseACB)
}

export function searchCardsName(params){
    return callAPI("cards/autocomplete?q=" + params.q).then(transformSearchResultACB);
}

export function searchExactName(params){
    return callAPI("cards/named?exact=" + params.q);
}

export function getRandomCommander(){
    return callAPI("cards/random?q=is%3Acommander")
}

export function getMtgSymbols(){
    return callAPI("symbology")
}
/*POST /echo/post/json HTTP/1.1
Host: reqbin.com
Accept: application/json
Content-Type: application/json
Content-Length: 81

{
  "Id": 78912,
  "Customer": "Jason Sweet",
  "Quantity": 1,
  "Price": 18.00
}*/
export function getListOfCards(names){
    return getListAPI("cards/collection", names)
}
export function getListOfCardsID(ids){
    return getListAPIid("cards/collection", ids)
}