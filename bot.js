class Bot {
    constructor() {
        this.choice = ["R", "P", "S"];
    }
    
    makeMove(gamestate) {
        let numberOfDynamite = 0; 
        let previousResult = "notDraw";
        let moveHistory = 'Select';
        if (gamestate['rounds'].length !== 0) {
            numberOfDynamite = this.getNumberOfDynamite(gamestate);
            previousResult = this.getPreviousResult(gamestate);
        }
        if (gamestate['rounds'].length >= 3) {
            moveHistory = this.analyseHistory(this.getP2History(gamestate));
        }
        let element = this.selectMove(numberOfDynamite, previousResult, moveHistory);
        return element;
    }
        
    selectMove(numberOfDynamite, previousResult, moveHistory) {
        if (moveHistory === 'Select') {
            if (previousResult === 'dynamiteDraw') {
                return 'W';
            } else if (previousResult === 'draw' && numberOfDynamite<100) {
                return 'D';
            } else {
                return this.choice[Math.floor(Math.random() * this.choice.length)];
            }
        } else {
            return moveHistory;
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
    }

    getP2History(gamestate) {
        let history = [];
        for (let round = 0; round < gamestate['rounds'].length; round++) {
            history.push(gamestate['rounds'][round].p2)
        }
        return history
    }

    analyseHistory(history) {
        let previousThreeRounds = history.slice((history.length - 3), history.length)
        if (previousThreeRounds.every((currentValue) => currentValue === "R")) {
            return "P"
        } else if (previousThreeRounds.every((currentValue) => currentValue === "P")) {
            return "S"
        } else if (previousThreeRounds.every((currentValue) => currentValue === "S")) {
            return "R"
        } else if (previousThreeRounds.every((currentValue) => currentValue === "D")) {
            return "W"
        } else if (previousThreeRounds.every((currentValue) => currentValue === "W")) {
            return this.choice[Math.floor(Math.random() * this.choice.length)];
        } else {
            return "Select"
        }
    }

}

module.exports = new Bot();