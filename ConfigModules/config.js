const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (action, pathFile) => {
    let result;
    if (action == "edit") 
     result = editModule()
    else
    result = null;

    return result
}

function editModule() {

    //TOODO
}