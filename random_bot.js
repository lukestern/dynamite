class Bot {
    constructor() {
        this.choice = ["R", "P", "S", "W", "D"];
    }
    
    makeMove(gamestate) {
        let numberOfDynamite = 0; 
        if (gamestate['rounds'].length !== 0) {
            numberOfDynamite = this.getNumberOfDynamite(gamestate);
        }
        let element = this.selectMove(numberOfDynamite);
        return element;
    }
        
    selectMove(numberOfDynamite) {
        let randomElement;
        if (numberOfDynamite < 100) {
            randomElement =  this.choice[Math.floor(Math.random() * this.choice.length)];
        } else if (numberOfDynamite >= 100) {
            randomElement =  this.choice[Math.floor(Math.random() * (this.choice.length -1))];
        }
        return randomElement;
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
    
}

module.exports = new Bot();