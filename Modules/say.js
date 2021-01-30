const  Discord = require("discord.js");
module.exports.run = async (client, message,config,args) => {
if(args.lenght > 1 && args[0].indexOf('<') && args[0].indexOf('>') && args[0].indexOf('#'))
{
  message.channel.send("salut");

}
else
{
  throw Error ("Mauvais syntaxe");
}
console.log("message : \n" + message)
console.log("client : \n" + client)
console.log("Config :  \n" + config)
console.log("args : \n" + args)
}