const Discord = require("discord.js");
module.exports.run = async (client,message, args, config) => {

  
// let author = message.guild.members.cache.get(message.author.id);
let authorRole = message.guild.member(message.author)._roles;
let roleFind = false

authorRole.forEach(element => {
  if (config.RolesWhitList.find(x => x == element))
      roleFind = true;
})
if (!roleFind)
  throw new Error("vous navez pas la permission d'utiliser cette commande");



  if (args.length > 1 && args[0].indexOf('<') != '-1' && args[0].indexOf('>') != '-1' && args[0].indexOf('#') != '-1') {
    let titre = message.content.split(args[0])[1];
    let filter = m => m.author.id === message.author.id;
    message.channel.send("veullez inserez votre texte").then( msg =>{
      setTimeout(() => {
        
      }, 10000);
    });

    const collector = message.channel.createMessageCollector(filter, { max: 1 });
    collector.on('collect', messageCollect => {
      salon = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''));
      console.log(salon.type);
      if(!isNaN(salon) && salon.type == "text")
      {
        let messageSend = new Discord.MessageEmbed()
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setColor(7339827)
        .addField(titre, messageCollect.content);
      salon.send(messageSend)

      }
      else
      {
        throw Error("Merci de mettre un salon Textuel et Valide");
      }
    })

  }
  else {
    console.log(config)
    throw Error("Mauvaise Syntaxe : `"+ config.Prefix+"say [salon] [titre]`");
  }

}
module.exports.help = {
  name: "say",
  description: "envoyé un message en embed",
  help: "-**Annonce** une information capitale sur le serveur",
  useDataJson : true
};