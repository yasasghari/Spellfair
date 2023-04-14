import { searchExactName, getListOfCards, getListOfCardsID} from "./cardSource";
import { ref } from "vue";

class DeckModel {
    constructor(title) {
        this.title = title
        this.amountOfCards = 0
        this.deckList = []
        this.deckCopy = []
        this.mulliganList = []
        this.description = ""
        this.promiseState = {}
        this.uid = ''
        this.observers = new Array()
        this.selectedCard = {name: "Selected card", image_uris: {normal: "https://i.redd.it/fr7g5swymhc41.png"}}
        this.commander = null        
        this.userEmail = ""
        this.commanderCandidates = []
    }

    setUID(newUID) {
        this.uid = newUID;
        this.notifyObservers({ userID: newUID })
    }

    setEmail(newEmail) {
        this.userEmail = newEmail;
        this.notifyObservers({ userEmail: newEmail })
    }

    resetModel(){
        this.setUID("-1")
        this.changeName("Example Goblin Deck")
        this.setCommander("Krenko, Mob Boss")
        this.deckList = []
        this.description = "This example Goblin deck contains cards of the Commander Format. This shows our multiple columns for decklist, and more than 75 card imports, a commander and this description."
        this.loadDecklist("1 Abrade\n1 Arcane Signet\n1 Arid Mesa\n1 Ashnod's Altar\n1 Battle Hymn\n1 Blood Moon\n1 Brightstone Ritual\n1 Buried Ruin\n1 Castle Embereth\n1 Cavern of Souls\n1 Chaos Warp\n1 Coldsteel Heart\n1 Conspicuous Snoop\n1 Darksteel Citadel\n1 Deflecting Swat\n1 Den of the Bugbear\n1 Desert of the Fervent\n1 Fellwar Stone\n1 Field of Ruin\n1 Forgotten Cave\n1 Gamble\n1 Gempalm Incinerator\n1 Goblin Bombardment\n1 Goblin Chieftain\n1 Goblin Chirurgeon\n1 Goblin Engineer\n1 Goblin King\n1 Goblin Matron\n1 Goblin Piledriver\n1 Goblin Recruiter\n1 Goblin Sharpshooter\n1 Goblin Trashmaster\n1 Goblin War Strike\n1 Goblin Warchief\n1 Great Furnace\n18 Mountain\n1 Muxus, Goblin Grandee\n1 Pashalik Mons\n1 Path of Ancestry\n1 Phyrexian Altar\n1 Purphoros, God of the Forge\n1 Pyroblast\n1 Red Elemental Blast\n1 Ruby Medallion\n1 Rundvelt Hordemaster\n1 Scavenger Grounds\n1 Siege-Gang Commander\n1 Skirk Prospector\n1 Skullclamp\n1 Sol Ring\n1 Swiftfoot Boots\n1 Sword of the Paruns\n1 Thornbite Staff\n1 Throne of the God-Pharaoh\n1 Tibalt's Trickery\n1 Torch Courier\n1 Umbral Mantle\n1 Valakut Awakening / Valakut Stoneforge\n1 Vandalblast\n1 War Room\n1 Warren Instigator\n1 Wheel of Fortune\n1 Wheel of Misfortune\n1 Wild Magic Surge")
        this.userEmail = ""; 
    }


    removeACard(card){
        if(card.nmr < 2){
            const a = this.deckList.indexOf(card)
            this.deckList.splice(a, 1)
            this.amountOfCards--
        }
        else{
            card.nmr--
        }
        this.notifyObservers({ userDeckList: this.databaseExport()})
    }
    addSingleCard(cardName){
        function compareCB(thisCard){
            if(cardName === thisCard.cardInfo.name){
                return true;
            }
        }
        let ob = this.deckList.find(compareCB);
        this.amountOfCards++
        if(ob){
        ob.nmr++
        this.notifyObservers({ userDeckList: this.databaseExport()})
        }
        else{
            function addCB(obje){
                function sortCB(a, b){
                    return a.cardInfo.name.localeCompare(b.cardInfo.name)
                }
                let cardInstance = {nmr : 1, cardInfo : obje, scryfallID : obje.id}
                this.deckList.push(cardInstance)
                this.deckList = this.deckList.sort(sortCB)
                this.notifyObservers({ userDeckList: this.databaseExport()})
            }
            ob = searchExactName({q: cardName})
            Promise.resolve(ob).then(addCB.bind(this))
        }
        


    }

    removeCommanderFromDeck(cardName){
        function compareCB(thisCard){
            if(cardName === thisCard.cardInfo.name){
                return true;
            }
        }
        let ob = this.deckList.find(compareCB);

        this.removeACard({nmr: 1, cardInfo: ob, scryfallID: ob.id})
    }
    setCommander(cardName){
        function addCB(obj){
            this.commander = obj
            this.notifyObservers({changeCommander: this.commander.name})

        }
        let ob = searchExactName({q: cardName})
        Promise.resolve(ob).then(addCB.bind(this))
    }

    changeName(string){
        this.title = string;
        this.notifyObservers({changeTitle: this.title})

    }

    /**
     * Loads decklist from DB using cardnames. This doesn't take into account specific editions and you should probably use the database version instead.
     * @param {*} decklist 
     */
    loadDecklist(decklist){        
        const numbers = []
        this.amountOfCards = 0
        function returnNumberCB(str){
            numbers.push(str.substring(0,str.indexOf(' ')))
        }
        const splitted = decklist.split('\n')
        
        if(splitted.length > 70){
            let smallerDeckLists = Array()
            let index = 0;
            for(let i = 0; i < splitted.length/2; i++){
                index += splitted[i].length+1
            }
            smallerDeckLists = [decklist.slice(0, index-1), decklist.slice(index)]
            // console.log(smallerDeckLists)
            smallerDeckLists.forEach(element => {
                // console.log(element)
                this.loadDecklist(element)
            });
        }else{

    
        //lets split up the numbers and the strings into seperate arrays of ints and strings. 
        //we can then use that number to make the objects later. 

        splitted.forEach(returnNumberCB) // this gives all respective numbers that we need later. 

        // getting only strings. very similar to previous.
        function returnStringCB(str){
            searchQueries.push(str.substring(str.indexOf(' ')+1))
        }
        const searchQueries = []
        splitted.forEach(returnStringCB)

        function addCardsCB(obje){
            let i = 0
            obje.data.forEach(element => {
                this.deckList.push({nmr : numbers[i], cardInfo : element, scryfallID : element.id})
                i++
                this.amountOfCards++
            })
            this.notifyObservers({userDeckList: this.databaseExport()} )
        }
        let ob = getListOfCards(searchQueries)
        Promise.resolve(ob).then(addCardsCB.bind(this))
    }
    }
    //    <<<<<<< <<<<<<<<<< FIREBASE INTEGRATION INTO DECKMODEL >>>>>> >>>>>>>
    /**Imports decklist. Used for firebase integration. Takes a list of objects containing a scryfall id in the property id, and
     * an amount stored in nmr. CAN TECHNICALLY BE USED instead of loadDeckList AS IT GETS EDITIONS/FOIL/LANGUAGE TOO but pls dont we dont support that yet xd
     * 
     * @param {*} decklist 
     */
        databaseImport(decklist){
            this.deckList = []
            var numbers = []
            var sIDs = []
            decklist.forEach((obj) => {
                numbers.push(obj.nmr)
                sIDs.push(obj.id)
            })
            
            function addCardsCB(obje){
                let i = 0
                obje.data.forEach(element => {
                    this.deckList[i] = {nmr : numbers[i], cardInfo : element, scryfallID : element.id}
                    i++
                    this.amountOfCards++
                })
            }
            let ob = getListOfCardsID(sIDs)
            Promise.resolve(ob).then(addCardsCB.bind(this))
        }
    /**Exports a decklist. Used for firebase integration.
     * 
     * @returns all cards as minimum posible data, ready to be stored in database
     */
    databaseExport(){
        let allScryfallIDs = new Array()
        this.deckList.forEach((item) => {
            allScryfallIDs.push({nmr : item.nmr, id: item.scryfallID})
        })
        return allScryfallIDs
    }


    addObserver(callback) {
        this.observers.push(callback)
    }

    removeObserver(callback) {
        function filterObserverCB(observer) {
            return observer !== callback
        }

        this.observers = this.observers.filter(filterObserverCB)
    }

    notifyObservers(payload) {
        function invokeObserverCB(observer) {
            observer(payload)
        }

        try {
            this.observers.forEach(invokeObserverCB);
        } catch (error) { console.log(error); }
    }
    selectNewCard(card){
        this.selectedCard = card
    }

    drawSevenCards(){
        this.mulliganList = []
        this.deckCopy = []

        for(let i = 0; i < this.deckList.length; i++){
            this.deckCopy.push({nmr: this.deckList[i].nmr, cardInfo: this.deckList[i].cardInfo})
            // console.log(this.deckCopy.length)
        }

        for(let i = 0; i < 7; i++){
            let randomNumber = Math.floor(Math.random()*this.deckCopy.length)
            this.mulliganList = [...this.mulliganList, this.deckCopy[randomNumber].cardInfo]
            this.deckCopy[randomNumber].nmr--
            if(this.deckCopy[randomNumber].nmr === 0){
                this.deckCopy.splice(randomNumber, 1)
            }
        }
    }

    drawOneCard(){
        let randomNumber = Math.floor(Math.random()*this.deckCopy.length)
        this.mulliganList = [...this.mulliganList, this.deckCopy[randomNumber].cardInfo]
        this.deckCopy[randomNumber].nmr--
        if(this.deckCopy[randomNumber].nmr === 0){
            this.deckCopy.splice(randomNumber, 1)
        }
    }

    findCommanders() {
        this.commanderCandidates = []

        this.deckList.forEach(element => {
            if(element.cardInfo.frame_effects){
                this.commanderCandidates.push(element.cardInfo)
            }            
        });
    }

}
export default DeckModel;
