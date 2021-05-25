class Bot {
    constructor() {
        this.choice = ["R", "P", "S"];
    }
    
    makeMove(gamestate) {
        let numberOfDynamite = 0; 
        let previousResult = "notDraw";
        
        if (gamestate['rounds'].length !== 0) {
            numberOfDynamite = this.getNumberOfDynamite(gamestate);
            previousResult = this.getPreviousResult(gamestate);
        }
        let element = this.selectMove(numberOfDynamite, previousResult);
        return element;
    }
        
    selectMove(numberOfDynamite, previousResult) {
        if (previousResult === 'dynamiteDraw') {
            return 'W';

        } else if (previousResult === 'draw' && numberOfDynamite<100) {
            return 'D';

        } else {
            return  this.choice[Math.floor(Math.random() * this.choice.length)];

        }
    }


    getNumberOfDynamite(gamestate) {
        let numberOfDynamite = 0;
        for (let round = 0; round < gamestate['rounds'].length; round++) {
            if (gamestate['rounds'][round].p1 === "D") {
                numberOfDynamite++;
            }
        }
        return numberOfDynamite;
    }

    getPreviousResult(gamestate) {
        let previousRound = gamestate['rounds'][gamestate['rounds'].length -1]
        if (previousRound.p1 === previousRound.p2) {
            if (previousRound.p1 === "D") {
                return "dynamiteDraw"
            }
            return "draw"
        } else {
            return "notDraw"
        }
        // Look back at last 2 rounds if 2 D the use W
    }
}

module.exports = new Bot();