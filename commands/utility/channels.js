const Discord = require('discord.js');
const LenoxCommand = require('../LenoxCommand.js');

module.exports = class channelsCommand extends LenoxCommand {
  constructor(client) {
    super(client, {
      name: 'channels',
      group: 'utility',
      memberName: 'channels',
      description: 'A list of all channels on your Discord server',
      format: 'channels',
      aliases: [],
      examples: ['channels'],
      clientpermissions: ['SEND_MESSAGES'],
      userpermissions: ['ADMINISTRATOR'],
      shortDescription: 'Information',
      dashboardsettings: true
    });
  }

  async run(msg) {
    const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
    const lang = require(`../../languages/${langSet}.json`);

    if (msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().length > 0) {
      const textchannelsembed = new Discord.MessageEmbed()
        .setDescription(`**📋 ${lang.channels_textchannels}**\n${msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().slice(0, 15)
          .map((textchannel) => `**#${textchannel.name}** (*${textchannel.id}*)`)
          .join('\n')}`)
        .setColor(3447003);

      const textchannels = await msg.channel.send({
        embed: textchannelsembed
      });

      if (msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().length > 15) {
        const reaction1 = await textchannels.react('◀');
        const reaction2 = await textchannels.react('▶');

        let firsttext = 0;
        let secondtext = 15;

        const collector = textchannels.createReactionCollector((reaction, user) => user.id === msg.author.id, {
          time: 60000
        });
        collector.on('collect', (r) => {
          const reactionadd = msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().slice(firsttext + 15, secondtext + 15).length;
          const reactionremove = msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().slice(firsttext - 15, secondtext - 15).length;

          if (r.emoji.name === '▶' && reactionadd !== 0) {
            r.users.remove(msg.author.id);
            const guildchannels = msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().slice(firsttext + 15, secondtext + 15)
              .map((textchannel) => `**#${textchannel.name}** (*${textchannel.id}*)`);

            firsttext += 15;
            secondtext += 15;

            const newembed = new Discord.MessageEmbed()
              .setColor(3447003)
              .setDescription(`**📋 ${lang.channels_textchannels}**\n${guildchannels.join('\n')}`);

            textchannels.edit({
              embed: newembed
            });
          }
          else if (r.emoji.name === '◀' && reactionremove !== 0) {
            r.users.remove(msg.author.id);
            const guildchannels = msg.guild.channels.filter((textChannel) => textChannel.type === 'text').array().slice(firsttext - 15, secondtext - 15)
              .map((textchannel) => `**#${textchannel.name}** (*${textchannel.id}*)`);

            firsttext -= 15;
            secondtext -= 15;

            const newembed = new Discord.MessageEmbed()
              .setColor(3447003)
              .setDescription(`**📋 ${lang.channels_textchannels}**\n${guildchannels.join('\n')}`);

            textchannels.edit({
              embed: newembed
            });
          }
        });
        collector.on('end', () => {
          reaction1.users.remove();
          reaction2.users.remove();
        });
      }
    }
    else {
      return msg.channel.send(lang.channels_notextchannels);
    }

    if (msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().length > 0) {
      const voicechannelsembed = new Discord.MessageEmbed()
        .setDescription(`**📡 ${lang.channels_voicechannels}**\n${msg.guild.channels.filter((voice) => voice.channel.type === 'voice').array().slice(0, 15)
          .map((voicechannel) => `**${voicechannel.name}** (*${voicechannel.id}*)`)
          .join('\n')}`)
        .setColor(3447003);

      const voicechannels = await msg.channel.send({
        embed: voicechannelsembed
      });

      if (msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().length > 15) {
        const reaction1 = await voicechannels.react('◀');
        const reaction2 = await voicechannels.react('▶');

        let firstvoice = 0;
        let secondvoice = 15;

        const collector = voicechannels.createReactionCollector((reaction, user) => user.id === msg.author.id, {
          time: 30000
        });
        collector.on('collect', (r) => {
          const reactionadd = msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().slice(firstvoice + 15, secondvoice + 15).length;
          const reactionremove = msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().slice(firstvoice - 15, secondvoice - 15).length;

          if (r.emoji.name === '▶' && reactionadd !== 0) {
            r.users.remove(msg.author.id);
            const guildchannels = msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().slice(firstvoice + 15, secondvoice + 15)
              .map((textchannel) => `**#${textchannel.name}** (*${textchannel.id}*)`);

            firstvoice += 15;
            secondvoice += 15;

            const newembed = new Discord.MessageEmbed()
              .setColor(3447003)
              .setDescription(`**📋 ${lang.channels_voicechannels}**\n${guildchannels.join('\n')}`);

            voicechannels.edit({
              embed: newembed
            });
          }
          else if (r.emoji.name === '◀' && reactionremove !== 0) {
            r.users.remove(msg.author.id);
            const guildchannels = msg.guild.channels.filter((textChannel) => textChannel.type === 'voice').array().slice(firstvoice - 15, secondvoice - 15)
              .map((textchannel) => `**#${textchannel.name}** (*${textchannel.id}*)`);

            firstvoice -= 15;
            secondvoice -= 15;

            const newembed = new Discord.MessageEmbed()
              .setColor(3447003)
              .setDescription(`**📋 ${lang.channels_voicechannels}**\n${guildchannels.join('\n')}`);

            voicechannels.edit({
              embed: newembed
            });
          }
        });
        collector.on('end', () => {
          reaction1.users.remove();
          reaction2.users.remove();
        });
      }
    }
    else {
      return msg.channel.send(lang.channels_novoicechannels);
    }
  }
};
