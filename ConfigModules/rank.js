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
          const callback = function (err) {
        if (err)
            console.log("Creation du fichier KO Erreur : " + err);
        else
            console.log("Creation du fichier du serveur OK ");
    };
    // Création de l'object De base // au lieu de ofaire ça faire le system de Gaetan => system de conv avec tant qu'il ne donne pas une réponse valide ça marche pas 
    objectRank  = new Object();
    objectRank.RolesWhitList = [""];
    objectRank.Hierarchie =[{"role":"","ordre":1}];
    objectRank.SalonRankUp = "";
    objectRank.OtherRoleWelcom = [""]
    objectRank.emojiRankUp = "";
    objectRank.LstMemberFac =  []
    // Conversion Object To Json
    objectRank = JSON.stringify(objectRank);
    fs.writeFile(path, objectRank, callback)
    }




 
}


function EditModule(){};
function ViewModule(){};
module.exports.help = {
    name: "rank",
    description: "Permette la configuration des Modules"
};