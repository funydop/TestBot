
const { Console } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const pathGlobalDataServer = './ServerData/';

// modif fait de variable 1 pourt l'objet et l'autre pour le path cvomme ça la pathe on le mets tout en haut pas besoin de le remetttre ( si ya besoin de la membre . guile quand même le mettre en haut pour le scop ) 
// enlever tout le tralala 

// rajouter le fait que seulement les whitliste peuveut fair la commande 

module.exports.run = async (client, message, args, config) => {
    // recuperation configuration rank. 
    if (!args[0])
    throw new Error("merci de mettre un argument valide") // fait message opour !rank et !rank up 
// let author = message.guild.members.cache.get(message.author.id);
let authorRole = message.guild.member(message.author)._roles;
let roleFind = false

authorRole.forEach(element => {
    if (config.RolesWhitList.find(x => x == element))
        roleFind = true;
})
if (!roleFind)
    throw new Error("vous navez pas la permission d'utiliser cette commande");


    let lstRoles = config.Hierarchie.sort().reverse();
    let salonRank = message.guild.channels.cache.get(config.SalonRankUp);
    ;
    // rank list 
    if (args[0].toLowerCase() == "list") { //  ne pas le faire pour le dernier role ça sert a R 
        lstRoles.forEach(element => {
            let lstUserWithRole = message.guild.roles.cache.get(element.role).members.map(m => m.user.id);
            // Tempo 
            // message.channel.send("Role : <@&" + element.role + ">" + lstUserWithRole);

            lstUserWithRole.forEach(userRole => {
               let user = message.guild.members.cache.get(userRole);
               let dateLastRankUp;
               console.log("premier" + dateLastRankUp);
                // message.channel.send("Boucle :  name :" + user.user.username);
                // salonRank.messages.fetch(x => x.channel.id == salonRank.id && x.author.bot == false).then(MessageRankUp => {
                // voir si plutard faut filtrer par id du salon; 
                salonRank.messages.fetch().then(MessageRankUp => {
                    // trie du tableau 
                    MessageRankUp.sort();
                     let msgWithMention = MessageRankUp.filter(x=> x.content.indexOf(user.user.id) != -1 || (x.embeds[0] != null &&x.embeds[0].description.indexOf(user.user.id) != -1) )
                    // console.log(msgWithMention)

                    if(msgWithMention != null)
                    {
                    
                        let result = Array.from(msgWithMention);
                        result = result[result.length-1]
                        dateLastRankUp = new Date(result[1].createdTimestamp);
                        console.log("dedant" + dateLastRankUp); 
                        // let timestampMention = msgWithMention[0].createdTimestamp;
                        // console.log("TIME :: " + timestampMention)

                    }
                    // let messageNaNEmbed = MessageRankUp.find(x => x.content.indexOf("Rank") != -1);
                    // console.log(messageNaNEmbed);


                            // console.log('id user : '  + user.user.id +" Nom user : " +user.user.username) ;
                            // console.log('description :  ' + test.embeds[0].description );
                        
                        let dateArriver = new Date(user.joinedTimestamp);
                        let MessageRank = new Discord.MessageEmbed();
                        MessageRank.setTitle("Rank up de : " + user.user.username);
                        MessageRank.setDescription("Date d'arriver" + dateArriver.toISOString().split('T').shift() + "\n" + "Dernier rank up " + dateLastRankUp.toISOString().split('T').shift());
                        message.channel.send(MessageRank).then(m=>{
                            m.react("✅");
                            m.react("❎");
                        });
                        
         
                    
                })
   
            })
            
        });



    }
    // pour le rank up 
    else {

        if (!args[0] && (args[0].toLowerCase() != "up" || args[0].toLowerCase() != "down")) // refaire 
            throw new Error("Merci de mettre un argument valide");

        userID = args[1].replace('<@!', '').replace('>', '');
        user = message.guild.members.cache.get(userID);
        let lstRolesUser = user._roles;

        // vérification 
        if (!user)
            throw new Error("merci de selectionner un utilisateur valide");
        if (user.user.bot)
            throw new Error("tu ne peut pas rank up un bot");
        if (!salonRank)
            throw new Error("Salon de rank up est introuvable, merci de vérifier le paramètrage");


        if (args[0].toLowerCase() == "up") {
            let lastIdRole;
            let newIdRole;

            // recuperation du dernier role cas l'utilisateur dans la liste 
            let isRoleFinde = false// degueulace a remplacer 

            lstRoles.forEach(element => {
                if (isRoleFinde == false) {
                    if (lstRolesUser.indexOf(element.role) != "-1") {

                        if (lstRolesUser.indexOf(lstRoles[0].role) != -1) {
                            message.channel.send("tu as atteint le dernier role")
                            isRoleFinde = true;
                            return;
                        }
                        newIdRole = lstRoles.find(x => x.ordre == element.ordre + 1).role;
                        lastIdRole = element.role;


                        if (!isNaN(newIdRole))
                            user.roles.add(newIdRole);
                        if (!isNaN(newIdRole))
                            user.roles.remove(lastIdRole);
                        let role = message.guild.roles.cache.get(newIdRole);

                        //  let emojie = message.guild.emojis.cache.get()
                        let msgRankup = new Discord.MessageEmbed() // mettre sa dans emojie serveur :/ 
                            .setDescription(message.guild.emojis.cache.get(config.emojiRankUp).toString() + " <@!" + userID + ">")
                            .addField(" \n **Rank Up** en tant que **" + role.name + "**\nMerci de ton implication dans la faction.", "\u200B")
                            .setFooter(message.guild.name, message.guild.iconURL())
                            .setTimestamp()
                            .setColor(role.color);
                        salonRank.send(msgRankup);

                        isRoleFinde = true;
                    }
                }
            });

            if (isRoleFinde == false && lstRolesUser.indexOf(lstRoles[0].role) == -1) // cas du premier venu ( envoyer message ect... ect ... )
            {
                let role = message.guild.roles.cache.get(lstRoles[lstRoles.length - 1].role);

                // user.removeRole(lastIdRole);
                if(role){
                user.roles.add(role);
                }
                else
                throw Error("Role non  trouver");
                
                config.OtherRoleWelcom.forEach(element => {
                    user.roles.add(element);
                })

                let msgRankup = new Discord.MessageEmbed()
                    .setDescription(message.guild.emojis.cache.get(config.emojiRankUp).toString() + " <@!" + userID + ">")
                    .addField(" \n **Rank Up** en tant que **" + role.name + "** \n Merci de ton implication dans la faction.", "\u200B")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor(role.color);

                    console.log("PATATATE");
                salonRank.send(msgRankup);
            }


            // const callback = function (err) {
            //     if (err) throw Error("Ajout du module Fait : Echec " + err);
            //     else message.channel.send("Ajout du module Fait  : Ok ").then(messageFini => {
            //         setTimeout(() => {
            //             messageFini.delete()
            //         }, (10000));
            //     });
            // };
            // let Rank = new Object(); 

            // Rank.role = args[0];
            // Rank.ordre = 1;
            // configRankPath.RolesWhitList.push(Rank);
            // console.log("ICII3");
            // console.log(configRankPath);
            // configRankPath = JSON.stringify(configRankPath);

            // fs.writeFile(pathGlobalDataServer + message.guild.id + "/rank.json", configRankPath, callback)



        }
    }

}

// mettre les emojis du serveur dans un json pour les ID personnalisé 
//rajouter en info dans le json la proertie  LstRoleRemoveMember
// et dan e l remove remove seulement si il a le role si il la'a pas ne rien faire l
// fair une copi du serveur Sr mettre tout les roles rank up //  objectife que sa marche nickel de A a Z 

//objectif rup up marche nickel après fair un commit, mais avant bien regardeles différence, une fois le push fait, vérifier que tout refonctionne bien et netooyaer avant de commit genre les modules qui ne marche pas bah ne pas les push x) 
// la liste plutot le fair en args du rank ganr !rank list. envoyer les message dans le salon ou c'est fait ( temporrairement ) 

// le rank list c'est : => récuperer la liste des user qui on le grade shadows Raven. / Boucler dessus et fair les test si il les respecte alors envoyer le message send 
// par contre pour les conditions. peut être les mettre dans le json 


// fair la liste des rank en up tout les vendredi en fonction des personne Cmd !list 
// faire le rank down dans une autre maj ( avec le fait de pouvoir mettre une raison  avec un await message avec max 1 )
// prendre en compte si l'utilisateur n'a aucun rôle (passage a sbire ) et quand l'utilisateur &a lme dernier role ( doyen )

// le Finale ça sera que pour quand il est leb einvenue l'ajout automatique dans la liste sur legoogles shit et llorsque qu'il est reank kic( kcik fac ) soit directement supprimer du google sheet 


// essayer de fair la commande genre a hcaque message dans objectife mise a jour dans le googl sheet

// 1. Rank up OK 
// 2. Rank List 
// 3. Rank down  
// 4. Rank Down et up  TIen a jout auto google Doc ( Arriver Kick )  et Message auto + raison si kick 
// 5. truc des objectif en auto 
// 6. ( Muste Pour le derank lister ce qui sont au bord du rarank 2 semain obj non randu et autre )

// regler le fait, quand on fait une commande innexstante correiger le promis 