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
function CreateModule(client, message, args) {
    let nameModule = args[1].toLowerCase().trim();
    let path = `./ServerData/${message.guild.id}/${nameModule}.json`;

    if (!fs.existsSync(path));
    {
        // Création de l'object De base 
        objectSugg = new Object();
        objectSugg.salonSuggestion = "";
        objectSugg.salonCommande = "";


        const callback = function (err) {
            if (err)
                console.log("Creation du fichier KO Erreur : " + err);
            else
                console.log("Creation du fichier du serveur OK");
        };
        
        objectSugg = JSON.stringify(objectSugg);
        fs.writeFile(path, objectSugg, callback)
    }
}

function EditModule() { };
function ViewModule() { };



module.exports.help = {
    name: "sugg",
    description: "Permette la configuration des Modules"
};