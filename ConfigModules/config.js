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

function CreateModule() {

    //TOODO
}
function EditModule() {

    //TOODO
}
function ViewModule() {

    //TOODO
}
module.exports.help = {
    name: "config",
    description: "Permette la configuration des Modules"
};