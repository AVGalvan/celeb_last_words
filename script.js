let messageGenerator = {
    //templates upon which the messages will be built
    templates: [
        `At [number], everyone has the [noun] he [verb]s.`,
        `I [verb] nothing but [noun].`,
        `[noun] has [verb]ed against me. The hour of my [noun] has come.`,
        `Can you turn a [adjective] [noun] into [noun]?`,
        `Do not [verb] my [noun]s!`,
        `O my [adjective] [noun], whither art thou [verb]ing?`,
        `Begone thou [adjective] [noun], which hast utterly [verb]ed me!`,
        `Did you [verb] my [noun]?`,
        `We are [noun]s, this is [adjective]`,
        `Do not [verb] my [noun]`

    ],
    //word bank from which insertions will be chosen
    wordBank: {
        nouns: ['weakness', 'gun', 'basket', 'depth', 'tennis', 'shit'],
        numbers: [Math.floor(Math.random() * 301)],
        verbs: ['bend', 'grab', 'compensate', 'paint', 'sack', 'fuck'],
        adjectives: ['miscreant', 'young', 'burly', 'drunk', 'colossal', 'whorish'],
        celebrities: ['Vin Diesel', 'Floyd Mayweather, Jr.', 'Michael Cera', 'Tina Fey', 'Flava Flav', 'Cesar Millan',],

    },
    //generates random date from now to the end of 2100
    randomDateGenerator(start = new Date(), end = new Date (2100, 11, 31)) {
      let futureDate =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      futureDate = futureDate.toDateString();
      return futureDate.slice(3)
    },

    //method that takes an argument for the type of word being searched for
    //'n' for nouns, 'num' for numbers,
    //'v' for verbs, 'a' for adjectives, 'c' for celebrities
    //the type will decide which array in the wordBank object the word will be drawn from
    randomWordFromBank(type){
        let length;
        switch (type) {
            case 'n': 
                length = this.wordBank.nouns.length;
                return this.wordBank.nouns[Math.floor(Math.random() * length)];
                break;
            case 'num': 
                length = this.wordBank.numbers.length;
                return this.wordBank.numbers[Math.floor(Math.random() * length)];
                break;
            case 'v':
                length = this.wordBank.verbs.length;
                return this.wordBank.verbs[Math.floor(Math.random() * length)];
                break;
            case 'a':
                length = this.wordBank.adjectives.length;
                return this.wordBank.adjectives[Math.floor(Math.random() * length)];
                break;
            case 'c':
                length = this.wordBank.celebrities.length;
                return this.wordBank.celebrities[Math.floor(Math.random() * length)];
                break;
            default: 
                return 'Boring conversation anyway';
                break;
        };
    },

    //method that generates a random message by selecting a random template,
    //finding and replacing bracketed word types with random corresponding words
    //from wordbank, and returning the new message
    generateMessage(){
        //a random template is split into an array by the spaces in the template string 
        let templateArr = this.templates[Math.floor(Math.random() * this.templates.length)].split(' ');
        let message = '';
        let replacementWord = '';
        let updatedElement = '';
        
        //for loop searches each element of templateArr and if it does not include any of the
        //bracketed word types it concats the word to the message string
        //if it does, it check which type of word it is and picks a random 
        //corresponding word from the word bank
        for (let i = 0; i < templateArr.length; i++){
            //if statement checks if current templateArr element includes bracketed word type & concats
            if (templateArr[i].includes('[noun]') === false && templateArr[i].includes('[number]') === false &&
            templateArr[i].includes('[verb]') === false  && templateArr[i].includes('[adjective]') === false  ){
                message = message.concat(' ', templateArr[i]);

            } else if (templateArr[i].includes('[noun]') === true){
                replacementWord = this.randomWordFromBank('n');
                updatedElement = templateArr[i].replace('[noun]', replacementWord);
                message = message.concat(' ', updatedElement);

            } else if (templateArr[i].includes('[number]') === true){
                replacementWord = this.randomWordFromBank('num');
                updatedElement = templateArr[i].replace('[number]', replacementWord);
                message = message.concat(' ', updatedElement);

            } else if (templateArr[i].includes('[verb]') === true){
                replacementWord = this.randomWordFromBank('v');
                updatedElement = templateArr[i].replace('[verb]', replacementWord);
                message = message.concat(' ', updatedElement);

            } else if (templateArr[i].includes('[adjective]') === true){
                replacementWord = this.randomWordFromBank('a');
                updatedElement = templateArr[i].replace('[adjective]', replacementWord);
                message = message.concat(' ', updatedElement);
                
            } else {
                return "Uh, something went wrong at the word replacement stage"
            };
        };
        message = message.charAt(1).toUpperCase() + message.slice(2);//capitalizes first letter
        message += '\n-' + this.randomWordFromBank('c');//adds celebrity name
        message += ', \n' + this.randomDateGenerator(); //adds random date 
        return message;
    }
}

console.log(messageGenerator.generateMessage());