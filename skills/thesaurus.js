// thesaurus api calls will go in here.

module.exports = function(controller) {

    controller.on('thesaurus:input', function(bot, message) {
      console.log('MESSAGE IN THES INPUTY', message.text);
    });

    controller.on('conversationStarted', function() {
    });



};
