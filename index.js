const { DH_CHECK_P_NOT_PRIME } = require("constants");
const discord = require("discord.js");
const fs = require("fs");
const allIntents = discord.Intents.ALL;
const client = new discord.Client({ ws: { intents: allIntents } });
client.login("Njc1NzcwNDIzNzExMTA1MDI1.Xj7-QA.vVk1TQ93YIfYYP8Ootq3GRsGlKU");
client.commands = new discord.Collection();
client.configCommands = new discord.Collection();
// const { Client, Intents } = require('discord.js');
// const myIntents = new Intents();
// myIntents.add('GUILD_PRESENCES', 'GUILD_MEMBERS');
// const client = new Client({ ws: { intents: myIntents } });

const pathDirectoryDataServer = './ServerData/';

const loadCommands = (dir = "./Modules") => {
        const commands = fs.readdirSync(`${dir}/`).filter(files => files.endsWith(".js"));
        
        for (const file of commands) {
            const getFileName = require(`${dir}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`✅ commande : ${getFileName.help.name}`);
        };
};

const loadEvents = (dir = "./events/") => {
        const events = fs.readdirSync(`${dir}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`${dir}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`✅ événement : ${evtName}`);
        };

};

const loadConfigCommands = (dir = "./ConfigModules") =>{
    const configCommands = fs.readdirSync(`${dir}/`).filter(files => files.endsWith(".js"));
        
    for (const file of configCommands) {
        const getFileName = require(`${dir}/${file}`);
        client.configCommands.set(getFileName.help.name, getFileName);
        console.log(`✅ ConfigCommande : ${getFileName.help.name}`);
    };
}


console.log("===Load Commande===");
loadCommands();
console.log("===Load Evenement===");
loadEvents();
console.log("===Load ConfigCommande===")
loadConfigCommands();


client.on('guildMemberAdd', member =>{
    client.user.setActivity("Membre : "+member.guild.memberCount,{ type: 'WATCHING' });
})
client.on('guildMemberRemove', member =>{
    client.user.setActivity("Membre : "+member.guild.memberCount,{ type: 'WATCHING' });
})


String.isNullOrEmpty = function (value) {
    return !(typeof value === "string" && value.length > 0);
}