module.exports.run = async (client, message, args, config) => {
 let Content = message.content.replace('<',"").replace('>',"");
    message.channel.send(Content);
}