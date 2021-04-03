const Discord = require("discord.js");
const fs = require("fs");

// a terme ferme Dialogue avec bot genre !config => Quelle module voulez vous config => que ovulez vous faire M=> Modules supprimer 

module.exports.run = async (client, message, args) => {

    // fait message opour !rank et !rank up 
    let author = message.guild.members.cache.get(message.author.id);
    let roleFind = false;
    author._roles.forEach(element => {
        if (client.dataModule.RolesWhitList.indexOf(element) != -1)
            roleFind = true;
    });
    if (roleFind || author.hasPermission("ADMINISTRATOR")) {
        if (!args[0])
            return viewMenuMessage(Discord, client, message);
        else {
            let action = args[0].toLowerCase().trim();
            if (action == "add" || action == "del")
                return addOrDelModules(client, message, args);
            else if (action == "view" || action == "edit")
                return viewOrEditModules(client, message, args);
            else
                throw Error("aucun Argument n'est valide seule `add,del,view,edit` son valide");
        }
    }
    else
        throw Error("vous navez pas la permission d'utiliser cette commande");





    // let tabCommande = ["add", "del", "edit", "view"];
    // let lstModules = __dirname + '/../ServerData/lstModules.json';
    // let pathDossierServeur = pathGlobalDataServer + message.guild.id;

    // if (fs.existsSync(lstModules)) {
    //     lstModules = fs.readFileSync(lstModules);
    //     lstModules = JSON.parse(lstModules);
    // } else
    //     throw new Error("le fichier lstModules.json est manquant");

    // if (args.length == 0) {

    //     // string commande
    //     let strCommand = "";
    //     tabCommande.forEach(element => {
    //         if (tabCommande.indexOf(element) == tabCommande.length - 1)

    //             strCommand += element;
    //         else
    //             strCommand += element + "-";
    //     })
    //     // string exemple 
    //     let strExemple = "`" + config.Prefix + "config " + tabCommande[0] + " " + strLstModulesInServerOff.split('-').shift() + "` pour ajouter un modules \n"
    //     strExemple += "`" + config.Prefix + "config " + tabCommande[1] + " " + strLstModulesInServerOn.split('-').shift() + "` pour supprimer un modules \n"
    //     strExemple += "`" + config.Prefix + "config " + tabCommande[2] + " " + strLstModulesInServerOn.split('-').shift() + " SalonDexemple #monsalon` pour mettre un jour une proprieté \n"
    //     strExemple += "`" + config.Prefix + "config " + tabCommande[3] + " " + strLstModulesInServerOn.split('-').shift() + " ou " + config.Prefix + tabCommande[3] + " ` pour  voir les propiéter d'un module ou tout les proprieter configurer sur le serveur \n"





    //     // fair le fs et run prendra en paral le first args (Add / Del / Update / view)  pour Add Modulle / dell Module  okys tard 
    //     // prendre en deuxièmme param  Message 
    //     let messageConfiguration;
    //     message.channel.send(messagePresentation).then(messageSend => {
    //         setTimeout(() => {
    //             messageSend.delete();
    //         }, (20000));
    //     })

    // }
    // else if (args.length == 1 && args[0].toLowerCase() == "view") {
    //     // faire juste pour le view MEssage Global qui montre tout les proprieter de tout les modules on. 

    //     if (!args[1]) {
    //         let messagePropertie = new Discord.MessageEmbed()
    //             .setTitle("message modules");

    //         config.LstModulesServer.forEach(element => {
    //             let myModule = pathGlobalDataServer + message.guild.id + '/' + element.name + ".json";
    //             if (fs.existsSync(myModule)) {
    //                 myModule = fs.readFileSync(myModule);
    //                 myModule = JSON.parse(myModule);
    //                 console.log("|| Objet du module ||");
    //                 console.log(myModule);
    //                 // var result = Object.keys(myModule).map((key) => [Number(key), myModule[key]]);
    //                 // var result = Object.entries(myModule); // ne marche pas les sous object
    //                 // var result = Object.keys(myModule).map(function(key) {
    //                 //     return [Number(key), myModule[key]];
    //                 //   });
    //                 var result = Array.from(myModule);
    //                 // let mymoduleToArray = Array.from(myModule);
    //                 console.log("|| Array du module ||");
    //                 console.log(myModule.toString());
    //                 // messagePropertie.addField("__**modules : " + element.name + "**__", "\u200B");
    //                 // for (let objectOfModule in mymodule) {
    //                 //     let monObjet = mymodule[objectOfModule];
    //                 //     let strObjet = "";
    //                 //     if(typeof(monObjet) == "object"){
    //                 //         strObjet = "pattaata";
    //                 //         monObjet.forEach(element => {


    //                 //         });
    //                 //         messagePropertie.addField(objectOfModule + ": ", "\n" + strObjet);
    //                 //     }
    //                 //     else
    //                 //     messagePropertie.addField(objectOfModule + ": ", "\n" + monObjet);

    //                 // }
    //             }
    //         });

    //         message.channel.send(messagePropertie);
    //     } else // fair par module
    //     {
    //         console.log(mymodule);

    //     }
    // }
    // else if (args.length > 1) {
    //     // vérification du dossier serveur  
    //     if (fs.existsSync(pathDossierServeur)) { // fair ça plus propre une sorte de cleanstring qui tolower et .trim 
    //         if (args.length == 2 && tabCommande.find(x => x == args[0].toLowerCase().trim()) && lstModules.listmodules.find(x => x.name.trim() == args[1].toLowerCase().trim())) {
    //             deuxArgs(pathDossierServeur, args[0].toLowerCase(), args[1].toLowerCase(), message, lstModules, config);
    //         } else if (args.length == 4)
    //             quatreArge(pathDossierServeur, ags[0], "fd", "fdf", "fdsd", "fdsf",) // TODO 
    //         else
    //             throw Error("voivla lala");
    //     }
    //     else
    //         throw Error("dossier du servuer innexistant");
    // }
    // else
    //     throw Error("merci de tapper un config valide ")
}



module.exports.help = {
    name: "config",
    description: "Permette la configuration des Modules",
    help: "-**Active ou Desactive** un module sur le serveur \n -**Configure** un module sur le serveur ",
    useDataJson: true
};


function deuxArgs(pathDossierServeur, commande, module, message, lstModules, configurationserver) {

    if (commande == "add") {

        if (lstModules.listmodules.find(x => x.name == module) && !configurationserver.LstModulesServer.find(x => x == module)) {


            const callback = function (err) {
                if (err) throw Error("Ajout du module Fait : Echec " + err);
                else message.channel.send("Ajout du module Fait  : Ok ").then(messageFini => { setTimeout(() => { messageFini.delete() }, (10000)); });
            };
            // Enregistrement dans le fichier JSON
            configurationserver = JSON.stringify(configurationserver);
            fs.writeFile(pathGlobalDataServer + message.guild.id + "/config.json", configurationserver, callback)


            // initialisation du fichier 
            let pathFileConfigModule = pathDossierServeur + "/" + module + ".json";
            if (!fs.existsSync(pathFileConfigModule)) {
                if (fs.existsSync(`./../ConfigModules/${module}.js`)) {
                    let commandeConfig = require(`./../ConfigModules/${module}.js`);


                    commandeConfig.run('add', pathFileConfigModule).catch(error => {

                        const messageError = new Discord.MessageEmbed()
                            .setTimestamp()
                            .setColor(15158332)
                            .setFooter(message.guild.name, message.guild.iconURL)
                            .setAuthor(message.author.username, message.author.avatarURL)
                            .setTitle(":warning: __ un problème est survenue __")
                            .addField("__** Message d'erreur :  **__", error.message)
                            .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

                        message.channel.send(messageError).then(msgerror => {
                            setTimeout(clear => { msgerror.delete(); }, 4000);
                            return;
                        })
                    })
                }
            }
        }
        else
            throw Error("module : " + module + " non trouvable ou ne peut pas être supprimer ");

    }
    if (commande == "del") {

        if (configurationserver.LstModulesServer.find(x => x.name == module) && !lstModules.whitlistModule.find(x => x == module)) {
            let indexOfDelete = configurationserver.LstModulesServer.findIndex(x => x.name == module)
            configurationserver.LstModulesServer = configurationserver.LstModulesServer.splice(0, indexOfDelete);
        }
        else
            throw Error("module non trouvable ou ne peut pas être supprimer ");


        const callback = function (err) {
            if (err) throw Error("Suppression du module : Echec " + err);
            else message.channel.send("Suppression du module : Ok ").then(messageFini => { setTimeout(() => { messageFini.delete() }, (10000)); });
        };

        // Enregistrement dans le fichier JSON
        configurationserver = JSON.stringify(configurationserver);
        fs.writeFile(pathGlobalDataServer + message.guild.id + "/config.json", configurationserver, callback)

    }
    if (commande == "view") {
        // TODO 
    }

}

function viewMenuMessage(Discord, client, message) {

    // string modulesll on 
    let strLstModulesInServerOn = "";
    client.configurationServer.LstModulesServer.forEach(element => {
        strLstModulesInServerOn += element.name + "-";
    })
    if (strLstModulesInServerOn.lastIndexOf("-" == strLstModulesInServerOn.length - 1))
        strLstModulesInServerOn = strLstModulesInServerOn.substring(0, strLstModulesInServerOn.length - 1);
    if (strLstModulesInServerOn.length == 0)
        strLstModulesInServerOn = "\u200B";


    // // string modules Off 
    let strLstModulesInServerOff = "";
    client.commands.forEach(element => {
        if (!client.configurationServer.LstModulesServer.find(x => x.name == element.help.name)) {
            strLstModulesInServerOff += element.help.name + "-";
        }
    })
    if (strLstModulesInServerOff.lastIndexOf('-') == strLstModulesInServerOff.length - 1)
        strLstModulesInServerOff = strLstModulesInServerOff.substr(0, strLstModulesInServerOff.length - 1);
    if (strLstModulesInServerOff.length == 0)
        strLstModulesInServerOff = "\u200B";


    configurationServer:
    // // string description 
    var strDescription = `Hey, Bienvenue dans la partie __configuration du serveur__ !
        c'est ici que tu vas pouvoir **Ajout ou supprimer** un module.  
        tu peut également **configurer** chaque modules (salon,roles,prefix, ect ...)
        et pour fini **Regarder** de manière global tout les paramètre configurer sur ton serveur.
        si tu a des questions n'hésite pas à contacté le développeur du bot. 
        `;


    let messageViewConfigMenu = new Discord.MessageEmbed()
        .setTitle("__**⚙ Configuration du serveur ⚙**__")
        .setDescription(strDescription)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .addField("__Liste des module active sur votre discord__", strLstModulesInServerOn)
        .addField("__Liste des modules désactiver sur votre serveur__", strLstModulesInServerOff)
        .addField("__Commande faisable :__", "`add,del,view,edit`")
        .addField("__Exemple__", "k")

    message.channel.send(messageViewConfigMenu);
    message.delete();
}

function addOrDelModules(client, message, args) {
    if (!args[1])
        throw Error("il vous manque le nom du module, Exemple : `" + client.configurationServer.Prefix + "config add sugg` ou `" + client.configurationServer.Prefix + "config del sugg`");
    let pathDataServerConfig = `./ServerData/${message.guild.id}/config.json`;
    let nomCommande = args[1].toLowerCase().trim();

    console.log("CECI est un test")
    // cas de l'ajout d'un module 
    if (args[0] == "add") {
        // vérification que le module existe
        if (client.commands.find(x => x.help.name == nomCommande)) {
            // vérification que le module ne soit pas déjà dans la liste 
            if (client.configurationServer.LstModulesServer.find(x => x.name == nomCommande))
                throw Error(`Le Module : ${nomCommande} est déjà ajouter.`)
            else {
                // récuperation de la commande. 
                let commande = client.commands.find(x => x.help.name == nomCommande);
                // vérification si il y a un fichier de configuration dans ConfigModules.
                if (commande.help.useDataJson) {
                    let commandeConfig = client.configCommands.find(x => x.help.name == nomCommande);
                    if(commandeConfig)
                    commandeConfig.run(client, message, args);
                    else
                    throw Error (`Le fichier de configuration ${nomCommande}.js est manquant`);

                }
                const callback = function (err) {
                    if (err) throw Error("Ajout du module Fait : Echec " + err);
                    else message.channel.send("Ajout du module Fait  : Ok ").then(messageFini => { setTimeout(() => { messageFini.delete() }, (10000)); });
                };
                // Enregistrement dans le fichier JSON
                let newModule = new Object();
                newModule.name = nomCommande;
                client.configurationServer.LstModulesServer.push(newModule);
                configurationserver = JSON.stringify(client.configurationServer);
                fs.writeFile(pathDataServerConfig, configurationserver, callback)
            }
        }
        else
            throw Error(`Le Module : ${nomCommande} n'existe pas`);
    }
    // cas de suppression d'un module 
    if (args[0] == "del") {
        if (client.commands.find(x => x.help.name == nomCommande)) {
            if (!client.configurationServer.LstModulesServer.find(x => x.name == nomCommande))
                throw Error(`Le Module : ${args[1]} est déjà été supprimer.`)
            else {
                const callback = function (err) {
                    if (err) throw Error(`Suppression du module Fait : Echec ${err}`);
                    else message.channel.send("Suppression du module Fait  : Ok ").then(messageFini => { setTimeout(() => { messageFini.delete() }, (10000)); });
                };

                let indexModules = client.configurationServer.LstModulesServer.findIndex(x => x.name == nomCommande);
                if (indexModules > -1)
                    client.configurationServer.LstModulesServer.splice(indexModules, 1);
                else
                    throw Error(`Erreur lors de la suppression du module : ${nomCommande}`);
                let configurationserver = JSON.stringify(client.configurationServer);
                fs.writeFile(pathDataServerConfig, configurationserver, callback)
            }
        }
        else
            throw Error(`Le Module : ${nomCommande} n'existe pas`);

    }
}

function viewOrEditModules(client, message, args) {

    console.log("view");
}