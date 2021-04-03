const discord = require("discord.js");
const fs = require("fs");


module.exports = (client, message) =>  {
    
      // Verification que le dossier existe 
      fs.stat(pathDirectoryDataServer + guild.id + "/", function (err) {
        if (!err) {
            console.log('Dossier du serveur existant');
        }
        // il n'existe pas nous créons le dossier 
        else if (err.code === 'ENOENT') {
            fs.mkdir(pathDirectoryDataServer + guild.id, function (err) {
                if (err) {
                    console.log("Nouveau Serveur : \n Creation du dossier KO Erreur : " + err)
                } else {
                    console.log("Nouveau Serveur : \n Creation du dossier OK")
                }
            })
        }
    });
    fs.stat(pathDirectoryDataServer + guild.id + "/config.json", function (err) {
        if (!err) {
            console.log('Fichier Globale du serveur existant');
        }
        // il n'existe pas nous créons le Fichier et on l'initialise ( préfix ou autre)
        else if (err.code === 'ENOENT') {
            const callback = function (err) {
                if (err)
                    console.log("Creation du fichier KO Erreur : " + err);
                else
                    console.log("Creation du fichier du serveur OK ");
            };
            // Création de l'object De base 
            objectGlobal = new Object();
            objectGlobal.Prefix = "!";
            objectGlobal.LstModulesServer = [{ "name": "help" }, { "name": "config" }];
            objectGlobal.RolesWhitList = [""];
            // Conversion Object To Json
            objectGlobal = JSON.stringify(objectGlobal);
            fs.writeFile(pathDirectoryDataServer + guild.id + "/config.json", objectGlobal, callback)
        }
    });
}