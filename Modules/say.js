const Discord = require("discord.js");
module.exports.run = async (message, args, config) => {

  if (args.length > 1 && args[0].indexOf('<') != '-1' && args[0].indexOf('>') != '-1' && args[0].indexOf('#') != '-1') {
    let titre = message.content.split(args[0])[1];
    let filter = m => m.author.id === message.author.id
    message.channel.send("veullez inserez votre texte").then( msg =>{
      setTimeout(() => {
        msg.delete()
      }, 1000);
    });

    const collector = message.channel.createMessageCollector(filter, { max: 1 });
    collector.on('collect', messageCollect => {

      
      let messageSend = new Discord.MessageEmbed()
        .setFooter(message.guild.name, message.guild.iconURL())
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setColor(7339827)
        .addField(titre, messageCollect.content);
      message.channel.send(messageSend);
      message.delete();
      m.delete();

    })

  }
  else {
    throw Error("Mauvaise Syntaxe : `"+ config.Prefix+"say [titre]`");
  }

}