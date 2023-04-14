/*
* utilities.js includes useful functions for different components
*
*/

import {getMtgSymbols} from './cardSource.js'

/**
 * Old version of getting mana symbols - through API call and linear search
 * @param {String} string - Mana symbols in text form
 * @returns URLs for mana images
 */
function getManaImages(string){
    if(string === '') return;
    let allManaSymbols = Array()
    let resultImages = []
    function fillManaSymbolsCB(prop){
        allManaSymbols = prop.data
        return allManaSymbols
    }
    function findManaSymbolsCB(arr){
        symbols.pop()
        //console.log(arr)
        symbols.forEach((findSymbol, findIndex) => {
            arr.forEach((value, index) =>{
                if(findSymbol === value.symbol){
                    resultImages.push(value.svg_uri)
                }
            })
        })
        return resultImages
    }
    function edwardcb(data){
        return data
    }
    const symbols = string.replaceAll('}', '}.').split('.')
    
    let promise = getMtgSymbols()
    const prom =  (promise.then(fillManaSymbolsCB).then(findManaSymbolsCB).then(edwardcb))
                                // ^ fills mana symbols from api, ^ finds them from a string, takes images
    return prom.reverse()
    // now have all mtg symbols
    // lets iterate through the symbols we got, find the correct image, display it
}

/**
 * New version of getting mana symbols - through URL endpoint
 * @param {String} string - Mana symbols in text form
 * @returns URLs for needed mana images
 */
function getManaNew(string){

    string = string.replaceAll('{', '')
    string = string.replaceAll('/','')
    //without promises
    const arr = string.split('}')
    arr.pop()
    let resultImages = []
    arr.forEach((value, index) =>{
        resultImages.push("https://svgs.scryfall.io/card-symbols/" + value+ ".svg")
    })
    return resultImages.reverse()
}

export {getManaImages, getManaNew}