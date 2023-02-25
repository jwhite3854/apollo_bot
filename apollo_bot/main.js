const APOLLObotCrew = require('./crew');
const APOLLObotRoller = require('./roller');


const APOLLObot = class {
    constructor(data = {}) {
        this.command = false;
        this.args = [];
        this.reply = '';
        this.commands = [
            'roll',
            'skillroll',
            'panic',
            'injury',
            'crew'
        ];
        this.clientUserId = '1062920121137516584';

        console.log('i exist!');
    }

    setClientUserId = (userID) => {
        this.clientUserId = userID;
    }

    isListening = (msg) => {
        this.command = false;
        this.args = [];

        if (msg.author.id === this.clientUserId) {
            return false;
        }

        if (msg.content.substring(0, 2) == '--') {
            let input_string = msg.content.toLowerCase().trim();
            let args = input_string.substring(2).split(' ');
            if (args.length > 0) {
                let cmd = args.shift();
                if (this.commands.includes(cmd)) {
                    this.command = cmd;
                    this.args = args;
                }
            }
        } 

        return (this.command);
    }

    isTalkingToMe(mentionedUsers) {
        if (mentionedUsers.size < 1) {
            return false;
        }

        return mentionedUsers.has(this.clientUserId);
    }

    runCommand = async () => {
        if (this.commands.includes(this.command)) {
            return await APOLLObot[this.command](this.args);
        }
    }

    static roll = async (args) => {
        let diePool = parseInt(args[0]);

        return APOLLObotRoller.roll(diePool);
    }

    static skillroll = async (args) => {
        let stressPool = 0;
        let totalSkillPool = parseInt(args[0]);
        if (args.length > 1) {
            stressPool = parseInt(args[1]);
        }

        return APOLLObotRoller.skill(totalSkillPool, stressPool);
    }

    static panic = async (args) => {
        let stressPool = parseInt(args[0]);

        return APOLLObotRoller.panic(stressPool);
    }

    static injury = async (args) => {
        return APOLLObotRoller.injury();
    }

    static crew = async (args) => {

    }

    static rollsave = async (args) => {
        let roll = Math.floor(Math.random() * 10) + 1;
        let result = roll;
        let targetNumber = 0;

        for (let arg of args) {
            let prefix = arg.substring(0,1);
            if (prefix === '+' ) {
                result = roll + parseInt(arg.substring(1));
            } else if (prefix === '-') {
                result = roll - parseInt(arg.substring(1));
            }

            if (prefix === 'v') {
                targetNumber = parseInt(arg.substring(1));
            }
        }

        let output = '**Result: ' + result + '** - ';

        if ( targetNumber > 0 ) {
            if ( result >= targetNumber ) {
                output = '**Success** - ' + output;
            } else {
                output = '**Failure** - ' + output;
            }
        }

        return output + 'Rolled: ' + roll;
    }

    static vehicle = async (args) => {
        if (PURPSbotVehicle.isListening(args)) {
            await PURPSbotVehicle.runCommand();
        }

        return PURPSbotVehicle.reply;
    }
}

module.exports = new APOLLObot();