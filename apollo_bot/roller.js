const APOLLObotRoller = class {

    constructor() {}

    roll = async (diePool) => {
        let results = [];
        if (diePool > 0) {
            for (let ii = 0; ii < diePool; ii++ ) {
                let roll = Math.floor(Math.random() * 6) + 1;
                results.push('[' + roll + ']');
            }
        }

        return 'Rolled: ' + results.join(' ') + "\n";
    }

    skill = async (totalSkillPool, stressPool) => {
        let results = [];
        let successes = 0;
        let panics = 0;

        if (totalSkillPool > 0) {
            for (let ii = 0; ii < totalSkillPool; ii++ ) {
                let roll = Math.floor(Math.random() * 6) + 1;
                if ( roll == 6 ) {
                    successes++;
                    results.push('[+]');
                } else {
                    results.push('[' + roll + ']');
                }
            }
        }

        if (stressPool > 0) {
            for (let ii = 0; ii < stressPool; ii++ ) {
                let roll = Math.floor(Math.random() * 6) + 1;
            
                if ( roll == 1 ) {
                    panics++;
                    results.push('[x]');
                } else if ( roll == 6 ) {
                    successes++;
                    results.push('[+]');
                } else {
                    results.push('[' + roll + ']');
                }
            }
        }

        let output = 'Rolled: ' + results.join(' ') + "\n";
        if (panics > 0) {
            output += "```diff"+"\n"+"--MAKE A PANIC ROLL!--"+"\n"+"```";
        } else if (successes > 0) {
            output += "**Succeeded with "+ successes + ' Success'+ ( successes > 1 ? 'es' : '' ) +"**";
        } else {
            output += "Roll failed. You can try pushing!";
        } 

        if (panics > 0) {
            output += "Your panic result: ";
            output += await this.panic(stressPool);
        }
        
        return output;
    }

    push = async () => {


    }
    
    panic = async (stressLevel) => {
        let roll = Math.floor(Math.random() * 6) + 1;
        let panic_level = stressLevel + roll;

        if (panic_level >= 15) {
            return '**Catatonic**.  Game over, man.';
        }

        switch (panic_level) {
            case 7:
                return '**Nervous twitch**. Your stress level increases by 1. Adjacent allies stress levels increase by 1.'
            case 8:
                return '**Tremble**. All Agility Rolls suffer -2 modification.'
            case 9:
                return '**Drop items**. GM decides what you drop. Your stress level increases by 1.';
            case 10:
                return '**Freeze**. Lose your next slow action. Your stress level increases by 1. Adjacent allies stress levels increase by 1.'
            case 11:
                return '**Seek cover**. Must use your next action to hide. You may retreat if engaged in combat. Your stress level decreases by 1. Adjacent allies stress levels increase by 1.'
            case 12:
                return '**Scream!** Lose your next slow action. Your stress level decreases by 1. Adjacent allies must make a panic roll.'
            case 13:
                return '**Flee!** Hide in a safe place, refuse to leave. No retreat roll allowed if engaged in combat. Your stress level decreases by 1. Adjacent allies must make a panic roll.'
            case 14:
                return '**BERSERK!** Immediately attack nearest person or creature until their condition is Broken. Adjacent allies must make a panic roll.'
            default:
                return 'Keep it together.'
        }
        
    }

    injury = async (args) => {
        let roll_1 = Math.floor(Math.random() * 6) + 1;
        let roll_2 = Math.floor(Math.random() * 6) + 1;
        
        return 'Check the table for result: [' + roll_1 + '] [' + roll_2 + ']';
    }
}

module.exports = new APOLLObotRoller();