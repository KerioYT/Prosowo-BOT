const commandHanler = require("./handlers/commands.handler")
const { Client, RichEmbed } = require('discord.js');
const client = new Client();


commandHanler(client)

client.on('ready', () => {
  client.user.setActivity(`@Invite | Servers: ^`, {type: `WATCHING`})
  console.log(`${client.user.tag} JEST AKTYWNY!`)
});


client.on('message', msg => {
  const { author, guild, channel, member } = msg

  

  if (msg.author.bot) {
    return
  }
  
  if (msg.content == "?") {
    msg.react("✅")
    msg.react("❌")
    return
  }

  if (msg.content == "xd") {
    msg.react("🆔")
    msg.react("😎")
    return
  }

  if (msg.content.indexOf(prefix) !== 0) return

  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  console.log(args)

  const cmd = args.shift().toLocaleLowerCase()
  

  if (cmd === 'ping') {
    channel.send('Pong!');
  }

   
  if(cmd == "infobot"){
    const embed = new RichEmbed()

    .setTitle("INFO O BOCIE")
    .setDescription("BOTA STWORZYŁ SIRIDO. WERSJA BOTA TO v0.1")
    .setColor(0xFF7F00)
    .setFooter(msg.member.user.tag, msg.member.user.avatarURL)

    msg.channel.send(embed)
    msg.delete()
  }
	
	if(cmd == "gg"){
    const embed = new RichEmbed()

    .setDescription("*Nie mogę dodać bota, co się dzieje?*")
    .setDescription("*Prawdopodobnie nie jesteś zalogowany na swoje konto Discord*")
    .setColor(0xFF7F00)

    msg.channel.send(embed)
    msg.delete()
  
  }
if(cmd == "info"){
    var embed = new RichEmbed()
    .addField("Nazwa Serwera:", msg.guild.name, true)
    .addField("Właściciel serwera:", msg.guild.owner.user.tag, true)
    .addField("Data stworzenia serwera:", msg.guild.createdAt, false)
    .addField("Data dołączenia na serwer:", msg.guild.joinedAt, false)
    .setColor("RED")
    .setTimestamp()
    .setFooter(msg.member.user.tag, msg.member.user.avatarURL)
    .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
    .setThumbnail(msg.guild.iconURL)
    .setImage(msg.guild.iconURL)


    msg.channel.send(embed)
}

  if(cmd == "help"){
    const embed = new RichEmbed()

    .setTitle("LISTA KOMEND INVITE ^")
    .setDescription("infobot - podaje informacje na temat bota \n info - podaje informacje na temat serwera \n ping - bot pisze pong \n rzutmonetą - bot wybiera randomowo jedną z dwóch opcji \n youtube - reklama kanału \n ? - tak czy nie? (głosowanie)")
    .setColor(0xe3ff00)
    .setFooter(msg.member.user.tag, msg.member.user.avatarURL)


    msg.channel.send(embed)
    msg.delete()
}
if(cmd == "rzutmonetą"){

    var wynik = (Math.floor(Math.random() * 2) == 0) ? 'Orzeł' : "Reszka"
    var embed = new RichEmbed()
    .setTitle("Wynik losowania:")
    .setDescription(wynik)
    .setColor("GREEN")
    return msg.channel.send(embed)
    msg.delete()
}
  


  if (msg.content.startsWith('kick')) {

    console.log("bot", guild.me.permissionsIn(channel).has(["ADMINISTRATOR"]))
  console.log("user", member.permissionsIn(channel).has(["ADMINISTRATOR"]))
  if (!member.permissionsIn(channel).has(["ADMINISTRATOR"])) {
    return msg.reply("NIE POSIADASZ PERMISJI!")
  }
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          channel.send(`Poprawnie wykickowałem ${user.tag}`);
        }).catch(err => {
          channel.send('Nie byłem w stanie wykickować członka');
          console.error(err);
        });
      } else {
        channel.send('Tego użytkownika nie ma w tej gildii!');
      }
    } else {
      channel.send('Podaj poprawną nazwę urzutkownika!');
    }
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => { 
    var logChannel = oldMember.guild.channels.find(c => c.name === 'log'); 
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id; 
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '\`\`???? ??????\`\`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '\`\`???? ??????\`\`'; 
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**UPDATE MEMBER NICKNAME**')
            .setThumbnail(userAvatar)
            .setColor('RANDOM') 
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
  
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
 
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**ADDED ROLE TO MEMBER**') 
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RANDOM') 
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) 
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
 
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**REMOVED ROLE FROM MEMBER**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RANDOM') 
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) 
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
        let newOwner = new Discord.RichEmbed()
        .setTitle('**UPDATE GUILD OWNER**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('RANDOM') 
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
client.on('guildMemberAdd', member => {
  var logChannel = member.guild.channels.find(c => c.name === 'log'); 
  if(!logChannel) return;
  
  let newMember = new Discord.RichEmbed()
  .setTitle('**NEW MEMBER JOINED**') 
  .setThumbnail(member.user.avatarURL)
  .setColor('RANDOM') 
  .setDescription(`**\n**:arrow_lower_right: **${member.user.username}** Has joined the server!\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})\n**Days In Discord:** ${Days(member.user.createdAt)}`)
  .setTimestamp()
  .setFooter(member.user.tag, member.user.avatarURL)
 
  logChannel.send(newMember);
});
function Days(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
}
client.on('guildMemberRemove', member => { 
  var logChannel = member.guild.channels.find(c => c.name === 'log'); 
  if(!logChannel) return; 
 
  let leaveMember = new Discord.RichEmbed()
  .setTitle('**USER LEFT**')
  .setThumbnail(member.user.avatarURL)
  .setColor('RANDOM') 
  .setDescription(`**\n**:arrow_upper_left: **${member.user.username}** Left the server.\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})`)  
  .setTimestamp() 
  .setFooter(member.user.tag, member.user.avatarURL)
  
  logChannel.send(leaveMember);
});

const config = require("./config.js")
const { token, prefix } = require("./config.js")
client.login(token)
