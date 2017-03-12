var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('facebook_optin', function(bot, message) {

      bot.reply(message, "Hi I'm Terry the Thesaurus Bot. Send me a word you'd like a synonym for and i'll go get you some.")
    });

}
