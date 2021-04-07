
const Discord = require("discord.js");
const fs = require("fs");
const pathGlobalDataServer = './ServerData/';

// modif fait de variable 1 pourt l'objet et l'autre pour le path cvomme ça la pathe on le mets tout en haut pas besoin de le remetttre ( si ya besoin de la membre . guile quand même le mettre en haut pour le scop ) 
// enlever tout le tralala 

// rajouter le fait que seulement les whitliste peuveut fair la commande 

module.exports.run = async (client, message, args) => {
    // recuperation configuration rank. 
    if (!args[0]){
     console.log(client);
        throw new Error("merci de mettre un argument valide \n exemple : `"+client.configurationServer.Prefix+"rank up identifiant`\n Argument Valide : Up / get / check / kick") // fait message opour !rank et !rank up 
    }
        // let author = message.guild.members.cache.get(message.author.id);
    let checkPerm = client.CheckPermission(client, message);

    if (!checkPerm)
        throw new Error("vous navez pas la permission d'utiliser cette commande");


    let lstRoles = client.dataModule.Hierarchie.sort().reverse();
    let salonRank = message.guild.channels.cache.get(client.dataModule.SalonRankUp);

    // rank list 
    if (args[0].toLowerCase() == "list") { //  ne pas le faire pour le dernier role ça sert a R  // si ya une dernier date rank up prendre si non dir prochain rank actualiser et le du rank up venir ecrire edans le ficheir 
        lstRoles.forEach(element => {
            let lstUserWithRole = message.guild.roles.cache.get(element.role).members.map(m => m.user.id);
            // Tempo 
            // message.channel.send("Role : <@&" + element.role + ">" + lstUserWithRole);
            if(element.ordre == lstRoles.length)
            return;


            lstUserWithRole.forEach(userRole => {


                let user = message.guild.members.cache.get(userRole);
                let dateLastRankUp;
                let dateArriver;
                let MessageRank = new Discord.MessageEmbed();

                // salonRank.messages.fetch().then(MessageRankUp => {
                // voir si plutard faut filtrer par id du salon; 

                utilisateur = client.dataModule.LstMemberFac.find(x => x.idMember == user.user.id);
                if (utilisateur) {

                    if (utilisateur.lastRankUp) {
                        dateLastRankUp = new Date(utilisateur.lastRankUp);
                        dateLastRankUp = dateLastRankUp.toISOString().split('T').shift();
                    }
                    else
                        dateLastRankUp = "Error Info";

                        if (utilisateur.dateJoin) {
                            dateArriver = new Date(utilisateur.dateJoin);
                            dateArriver = dateArriver.toISOString().split('T').shift();
                        }
                        else
                            dateArriver = "Error Info";
    


                        MessageRank.setTitle("Rank up de : " + user.nickname);
                        MessageRank.setDescription("Date d'arriver : " + dateArriver + "\n" + "Dernier rank up : " + dateLastRankUp);
                        //TODO 
                        message.channel.send(MessageRank).then(m => {
                            m.react("✅");
                            m.react("❎");
                        });


                }
                else {
                   
                    MessageRank.setTitle("Rank up de : " + user.nickname);
                    MessageRank.setDescription("Date d'arriver : ??? \n" + "Dernier rank up : ??? ");
                    //TODO 
                    message.channel.send(MessageRank).then(m => {
                        m.react("✅");
                        m.react("❎");
                    });
                }


               




            })

        });



    }
    else if(args[0].toLowerCase() == "get")
    {
        // Variable : 

        let tabDate =[
        {dateRank:"17-03-2021",dateJoin:"17-03-2021",idUser:"438041969172676609"},
        {dateRank:"27-03-2021",dateJoin:"27-03-2021",idUser:"482291118235451432"},
        {dateRank:"10-02-2021",dateJoin:"10-02-2021",idUser:"335543227497316352"},
        {dateRank:"06-02-2021",dateJoin:"21-12-2020",idUser:"382971081788751873"},
        {dateRank:"09-03-2021",dateJoin:"09-03-2021",idUser:"609587876556046338"},
        {dateRank:"08-02-2021",dateJoin:"08-02-2021",idUser:"382559506648793088"},
        {dateRank:"15-03-2021",dateJoin:"15-03-2021",idUser:"691955096069603408"},
        {dateRank:"02-01-2021",dateJoin:"28-11-2020",idUser:"334744785808130048"},
        {dateRank:"27-03-2021",dateJoin:"27-03-2021",idUser:"353550548093501440"}
        ]
        
        strFinale = "";
        
        tabDate.forEach(element=>{
            console.log("\n\n  USER : " + element.idUser);
        let Obj = new Object();
        Obj.idMember = element.idUser;
    
    
        // Rank 
        let splitRank = element.dateRank.split("-");
        let DateRank = new Date(splitRank[2], splitRank[1] - 1, splitRank[0]);
        DateRank.setDate(DateRank.getDate()+1);
        DateRank = DateRank.getTime();
        console.log("TimeSpan Rank : " + DateRank);
        Obj.lastRankUp = DateRank;
    
        DateRank = new Date(DateRank);
        console.log(":Verification: => " + DateRank.toISOString().split('T').shift());
    
    
        // join 
        let splitJoin = element.dateJoin.split("-");
        let DateJoin = new Date( splitJoin[2], splitJoin[1] - 1, splitJoin[0]);
        DateJoin.setDate(DateJoin.getDate()+1);
        DateJoin = DateJoin.getTime();
        console.log("TimeSpan Join : " + DateJoin);
        Obj.dateJoin = DateJoin;
    
        DateJoin = new Date(DateJoin);
        console.log(":Verification: => " + DateJoin.toISOString().split('T').shift())+"\n";
        
        
    
        let StrObj = JSON.stringify(Obj);
        strFinale = strFinale + "," + StrObj;
        
        console.log("Object :"); 
        console.log(StrObj)
    
    
        // fair le stringigy sur juste l'object pour pouvoir copy paste 
    })
        console.log("\n\nfinale");
        console.log(strFinale);        
    }
    else if(args[0].toLowerCase() == "check")
    {
        message.channel.send("SOON SOON ")
    }
    else if(args[0].toLowerCase() == "kick")
    {
        message.channel.send("SOON SOON ausII")
    }
    // pour le rank up 
    else {

        if (!args[0] && (args[0].toLowerCase() != "up" || args[0].toLowerCase() != "down"))  // refaire 
            throw new Error("Merci de mettre un argument valide \n exemple : `"+client+"`");

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
            let path = pathGlobalDataServer + message.guild.id + '/rank.json'
            let lastIdRole;
            let newIdRole;
            // recuperation du dernier role cas l'utilisateur dans la liste 
            let isRoleFinde = false// degueulace a remplacer 

            lstRoles.forEach(element => {
                if (isRoleFinde == false) {
                    if (lstRolesUser.indexOf(element.role) != "-1") {

                        let lastRole = lstRoles.find(x => x.ordre == lstRoles.length);

                        if (lstRolesUser.indexOf(lastRole.role) != -1) {
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
                            .setDescription(message.guild.emojis.cache.get(client.dataModule.emojiRankUp).toString() + " <@!" + userID + ">")
                            .addField(" \n **Rank Up** en tant que **" + role.name + "**\nMerci de ton implication dans la faction.", "\u200B")
                            .setFooter(message.guild.name, message.guild.iconURL())
                            .setTimestamp()
                            .setColor(role.color);
                        salonRank.send(msgRankup);
                        isRoleFinde = true;

                        if (!client.dataModule.LstMemberFac.find(x => x.idMember == userID)) {
                            // faire Errrore ou voir mais pas normal car, pas nouveau utilisateeurt du coup manque inbfp 
                        }
                        else {
                            let userRank = client.dataModule.LstMemberFac.find(x => x.idMember == userID);
                            let indexUser = client.dataModule.LstMemberFac.indexOf(userRank);
                            client.dataModule.LstMemberFac[indexUser].lastRankUp = Date.now();
                        }


                        const callback = function (err) {
                            if (err) throw Error("Ajout du module Fait : Echec " + err);
                            else message.channel.send("Ajout du module Fait  : Ok ").then(messageFini => {
                                setTimeout(() => {
                                    messageFini.delete()
                                }, (10000));
                            });
                        };

                        let objJSON = JSON.stringify(client.dataModule);
                        fs.writeFile(path, objJSON, callback)

                    }
                }
            });

            let firstRoles = lstRoles.find(x => x.ordre == 1);

            if (isRoleFinde == false && lstRolesUser.indexOf(firstRoles.role) == -1) // cas du premier venu ( envoyer message ect... ect ... )
            {

                let role = message.guild.roles.cache.get(firstRoles.role);
                // user.removeRole(lastIdRole);
                if (role) {
                    user.roles.add(role);
                }
                else
                    throw Error("Role non  trouver");

                client.dataModule.OtherRoleWelcom.forEach(element => {
                    user.roles.add(element);
                })

                let objRank = new Object();
                objRank.idMember = userID;
                objRank.lastRankUp = Date.now();
                objRank.dateJoin = Date.now()
                client.dataModule.LstMemberFac.push(objRank);

                const callback = function (err) {
                    if (err) throw Error("Ajout du module Fait : Echec " + err);
                    else message.channel.send("Ajout du module Fait  : Ok ").then(messageFini => {
                        setTimeout(() => {
                            messageFini.delete()
                        }, (10000));
                    });
                };

                let objJSON = JSON.stringify(client.dataModule);
                fs.writeFile(path, objJSON, callback)


                let msgRankup = new Discord.MessageEmbed()
                    .setDescription(message.guild.emojis.cache.get(client.dataModule.emojiRankUp).toString() + " <@!" + userID + ">")
                    .addField(" \n **Bienvenue** en tant que **" + role.name + "** \n On espère que tu te plairas chez nous.", "\u200B")
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                    .setColor(role.color);

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

module.exports.help = {
    name: "rank",
    description: "permet la Gestion d'une Hierarchie",
    help: "-**Permet** l'instoration d'une Hierarchie sur le serveur",
    useDataJson: true
};