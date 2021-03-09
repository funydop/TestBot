const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (action, pathFile) => {

    let result = (action =="edit") ? editModule() : CreateModule(pathFile);
    return result
}
function CreateModule(pathFile){
    const callback = function (err) {
        if (err)
            console.log("Creation du fichier KO Erreur : " + err);
        else
            console.log("Creation du fichier du serveur OK ");
    };
    // Création de l'object De base 
    objectGlobal = new Object();
    objectGlobal.RolesWhitList = [];
    // Conversion Object To Json
    objectGlobal = JSON.stringify(objectGlobal);
    console.log(objectGlobal);
    console.log(pathFile);
    fs.writeFile(pathFile, objectGlobal, callback)
}

function editModule()
{

    //TOODO
}