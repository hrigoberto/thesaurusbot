// thesaurus api calls will go in here.
require('dotenv').config();
var axios = require('axios');
var api_key = process.env.THESAURUS_API_KEY

module.exports = function(controller) {

    controller.on('thesaurus:input', function(bot, message) {
      console.log('MESSAGE IN THES INPUTY', message.text);
      var word = message.text
      axios.get(`http://words.bighugelabs.com/api/2/${api_key}/${word}/json`)
      .then(function(response){
        console.log('RESPONSE DATA',response.data);
        if ( response.data ) {
          var wordtypes = Object.keys(response.data);
          console.log(wordtypes);
          var synArray = wordtypes.reduce(function(acc, type) {
            if(response.data[type]['syn'] !== null) {
              response.data[type]['syn'].map(function(syn) {
                if(acc.indexOf(syn) < 0) {
                  acc.push(syn)
                }
              })
              // acc.push(response.data[type]['syn']) ;
              //write a map for the syn arrays to push it into acc and check if it's in tehre already
            }
            return acc;
          }, [])

          console.log('Array of Synonyms', synArray);
          if (synArray.length > 9) {
            return synArray.splice(0, 10);
          }
          return bot.reply(message, synArray.join())
          // var synArray = wordtypes.map(function(wordtype) {
          //   if(wordtype['syn'] !== null){
          //     return wordtype;
          //   }
          //   return;
          // });
          // var filtered response = synArray.map(function(syntype) {
          //   return {syntype: response.data[syntype]}
          // })


        }


        return bot.reply(message, "I don't have synonyms for that")

      })
      .catch(function(err) {
        console.log('err in thesaurus', err);
      })
    });

    controller.on('conversationStarted', function() {
    });



};
