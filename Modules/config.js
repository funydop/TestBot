const Discord = require("discord.js");
const fs = require("fs");
const { cpuUsage } = require("process");
const pathGlobalDataServer = './ServerData/';

// a terme ferme Dialogue avec bot genre !config => Quelle module voulez vous config => que ovulez vous faire M=> Modules supprimer 

module.exports.run = async (client, message, args, config) => {

    // fait message opour !rank et !rank up 
    // let author = message.guild.members.cache.get(message.author.id);
    let authorRole = message.guild.member(message.author)._roles;
    let roleFind = false

    authorRole.forEach(element => {
        if (config.RolesWhitList.find(x => x == element))
            roleFind = true;
    })
    if (!roleFind)
        throw new Error("vous navez pas la permission d'utiliser cette commande");
    let tabCommande = ["add", "del", "edit", "view"];
    let lstModules = __dirname + '/../ServerData/lstModules.json';
    let pathDossierServeur = pathGlobalDataServer + message.guild.id;

    if (fs.existsSync(lstModules)) {
        lstModules = fs.readFileSync(lstModules);
        lstModules = JSON.parse(lstModules);
    } else
        throw new Error("le fichier lstModules.json est manquant");

    if (args.length == 0) {

        // string modulesll on 
        let strLstModulesInServerOn = "";
        config.LstModulesServer.forEach(element => {
            if (config.LstModulesServer.indexOf(element) == config.LstModulesServer.length - 1)
                strLstModulesInServerOn += element.name;
            else
                strLstModulesInServerOn += element.name + "-";
        })
        if (strLstModulesInServerOn.length == 0)
            strLstModulesInServerOn = "\u200B";



        // string modules Off 
        let strLstModulesInServerOff = "";
        lstModules.listmodules.forEach(element => {
            if (!config.LstModulesServer.find(x => x.name == element.name)) {
                strLstModulesInServerOff += element.name + "-";
            }
        })
        if (strLstModulesInServerOff.lastIndexOf('-') == strLstModulesInServerOff.length - 1)
            strLstModulesInServerOff = strLstModulesInServerOff.substr(0, strLstModulesInServerOff.length - 1);
        if (strLstModulesInServerOff.length == 0)
            strLstModulesInServerOff = "\u200B";



        // string description 
        let strDescription = `
        Hey, Bienvenue dans la partie __configuration du serveur__ !,
        c'est ici que tu vas pouvoir __Ajout, supprimer un module__.  
        tu peut également __configurer chaque modules__ (salon,roles,prefix, ect ...)
        et pour fini __Regarder de manière global__ tout les paramètre configurer sur ton serveur.
        si tu a des questions n'hésite pas à contacré le développeur du bot. 
        `;


        // string commande
        let strCommand = "";
        tabCommande.forEach(element => {
            if (tabCommande.indexOf(element) == tabCommande.length - 1)

                strCommand += element;
            else
                strCommand += element + "-";
        })
        // string exemple 
        let strExemple = "`" + config.Prefix + "config " + tabCommande[0] + " " + strLstModulesInServerOff.split('-').shift() + "` pour ajouter un modules \n"
        strExemple += "`" + config.Prefix + "config " + tabCommande[1] + " " + strLstModulesInServerOn.split('-').shift() + "` pour supprimer un modules \n"
        strExemple += "`" + config.Prefix + "config " + tabCommande[2] + " " + strLstModulesInServerOn.split('-').shift() + " SalonDexemple #monsalon` pour mettre un jour une proprieté \n"
        strExemple += "`" + config.Prefix + "config " + tabCommande[3] + " " + strLstModulesInServerOn.split('-').shift() + " ou " + config.Prefix + tabCommande[3] + " ` pour  voir les propiéter d'un module ou tout les proprieter configurer sur le serveur \n"



        let messagePresentation = new Discord.MessageEmbed();
        messagePresentation.setTitle("__**⚙ Configuration du serveur ⚙**__")
            .setDescription(strDescription)
            .addField("__liste des module active sur votre discord__", strLstModulesInServerOn)
            .addField("__ liste des modules désactiver sur votre serveur__", strLstModulesInServerOff)
            .addField("__commande faisable :__", strCommand)
            .addField("__ Exemple__", strExemple)


        // fair le fs et run prendra en paral le first args (Add / Del / Update / view)  pour Add Modulle / dell Module  okys tard 
        // prendre en deuxièmme param  Message 
        let messageConfiguration;
        message.channel.send(messagePresentation).then(messageSend => {
            setTimeout(() => {
                messageSend.delete();
            }, (20000));
        })

    }
    else if (args.length == 1 && args[0].toLowerCase() == "view") {
        // faire juste pour le view MEssage Global qui montre tout les proprieter de tout les modules on. 

        if (!args[1]) {
            let messagePropertie = new Discord.MessageEmbed()
                .setTitle("message modules");

            config.LstModulesServer.forEach(element => {
                let myModule = pathGlobalDataServer + message.guild.id + '/' + element.name + ".json";
                if (fs.existsSync(myModule)) {
                    myModule = fs.readFileSync(myModule);
                    myModule = JSON.parse(myModule);
                    console.log("|| Objet du module ||");
                    console.log(myModule);
                    // var result = Object.keys(myModule).map((key) => [Number(key), myModule[key]]);
                    // var result = Object.entries(myModule); // ne marche pas les sous object
                    // var result = Object.keys(myModule).map(function(key) {
                    //     return [Number(key), myModule[key]];
                    //   });
                    var result = Array.from(myModule);
                    // let mymoduleToArray = Array.from(myModule);
                    console.log("|| Array du module ||");
                    console.log(myModule.toString());
                    // messagePropertie.addField("__**modules : " + element.name + "**__", "\u200B");
                    // for (let objectOfModule in mymodule) {
                    //     let monObjet = mymodule[objectOfModule];
                    //     let strObjet = "";
                    //     if(typeof(monObjet) == "object"){
                    //         strObjet = "pattaata";
                    //         monObjet.forEach(element => {


                    //         });
                    //         messagePropertie.addField(objectOfModule + ": ", "\n" + strObjet);
                    //     }
                    //     else
                    //     messagePropertie.addField(objectOfModule + ": ", "\n" + monObjet);

                    // }
                }
            });

            message.channel.send(messagePropertie);
        } else // fair par module
        {
            console.log(mymodule);

        }
        console.log("CAtO?");

    }
    else if (args.length > 1) {
        // vérification du dossier serveur  
        if (fs.existsSync(pathDossierServeur)) { // fair ça plus propre une sorte de cleanstring qui tolower et .trim 
            if (args.length == 2 && tabCommande.find(x => x == args[0].toLowerCase().trim()) && lstModules.listmodules.find(x => x.name.trim() == args[1].toLowerCase().trim())) {
                deuxArgs(pathDossierServeur, args[0].toLowerCase(), args[1].toLowerCase(), message, lstModules);
            } else if (args.length == 4)
                quatreArge(pathDossierServeur, ags[0], "fd", "fdf", "fdsd", "fdsf",) // TODO 
            else
                throw Error("voivla lala");
        }
        else
            throw Error("dossier du servuer innexistant");
    }
    else
        throw Error("merci de tapper un config valide ")
}

function deuxArgs(pathDossierServeur, commande, module, message, lstModules) {

    if (commande == "add") {

        if (lstModules.listmodules.find(x => x.name == module) && !configurationserver.LstModulesServer.find(x => x == module)) {

            let newModules = new Object();
            newModules.name = module;
            configurationserver.LstModulesServer.push(newModules);

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
