const Discord = require("discord.js");
module.exports.run = async (client,message, args, config) => {

  if (args.length > 1 && args[0].indexOf('<') != '-1' && args[0].indexOf('>') != '-1' && args[0].indexOf('#') != '-1') {
    let titre = message.content.split(args[0])[1];
    let filter = m => m.author.id === message.author.id;
    message.channel.send("veullez inserez votre texte").then( msg =>{
      setTimeout(() => {
        msg.delete()
      }, 1000);
    });

    const collector = message.channel.createMessageCollector(filter, { max: 1 });
    collector.on('collect', messageCollect => {
      salon = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''));
      console.log(salon.type);
      if(!isNaN(salon) && salon.type == "text")
      {
        let messageSend = new Discord.MessageEmbed()
        .setFooter(message.guild.name, message.guild.iconURL())
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setColor(7339827)
        .addField(titre, messageCollect.content);
      salon.send(messageSend);
      message.delete();
      messageCollect.delete();




      }
      else
      {
        throw Error("Merci de mettre un salon Textuel et Valide");
      }
    })

  }
  else {
    throw Error("Mauvaise Syntaxe : `"+ config.Prefix+"say [salon] [titre]`");
  }

}