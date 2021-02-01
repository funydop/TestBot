const  Discord = require("discord.js");
module.exports.run = async (message,args,config) => {
if(args.lenght > 1 && args[0].indexOf('<') && args[0].indexOf('>') && args[0].indexOf('#'))
{
  message.channel.send("salut");

}
else
{
  throw Error ("Mauvais syntaxe");
}

}
