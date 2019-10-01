const Discord = require('discord.js')
const Embed = new Discord.RichEmbed()

exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) }
    
    if (msg.member.roles.has(bot.config.roles.id.Joueur)) {
        msg.member.removeRole(bot.config.roles.id.Joueur).catch(bot.ls.error, console.error)
        msg.channel.send("Vous ne serrez plus notifié lors des évenements et parties.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

            
        console.log(bot.ls.info, bot.config.prefix + "jeu " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        
        WebhookPrivate.send(Embed
            .setColor(bot.config.roles.color.Joueur)
            .setDescription("Rôle **" + bot.config.roles.name.Joueur + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

        WebhookPublic.send(Embed
            .setColor(bot.config.roles.color.Joueur)
            .setDescription("Rôle **" + bot.config.roles.name.Joueur + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        
        msg.member.addRole(bot.config.roles.id.Joueur).catch(console.error)
        msg.channel.send('Vous serrez notifié lors des évenements et parties.')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "jeu " + " de " + msg.author.tag + " (" + msg.author.id + ")") 

        WebhookPrivate.send(Embed
            .setColor(bot.config.roles.color.Joueur)
            .setDescription("Rôle **" + bot.config.roles.name.Joueur + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

        WebhookPublic.send(Embed
            .setColor(bot.config.roles.color.Joueur)
            .setDescription("Rôle **" + bot.config.roles.name.Joueur + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}