const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (client, message, args) => {
    let result;
    switch (args[0].toLowerCase().trim()) {
        case "add":
            result = CreateModule(client, message, args);
            return result;
            break;
        case "edit":
            result = EditModule(client, message, args);
            return result;
            break;
        default:
            result = ViewModule(client, message, args);
            return result;
            break;
    }
}

function CreateModule(client, message, args){
    let nameModule = args[1].toLowerCase().trim();
    let path = `./ServerData/${message.guild.id}/${nameModule}.json`;
    if(!fs.existsSync(path));
    {
        let objectSay = new Object();
        objectSay.RolesWhitList = [];

        message.channel.send("SALUT JEE CREE");
    
        const callback = function (err) {
            if (err)
                console.log("Creation du fichier KO Erreur : " + err);
            else
                console.log("Creation du fichier du serveur OK");
        };
        
        objectSay = JSON.stringify(objectSay);
        fs.writeFile(path, objectSay, callback)
    }
}

function EditModule(){};
function ViewModule(){};

module.exports.help = {
    name: "say",
    description: "Permette la configuration des Modules"
};