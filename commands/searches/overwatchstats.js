const Discord = require('discord.js');
const OWStats = require('overwatch-stats');
const LenoxCommand = require('../LenoxCommand.js');

module.exports = class overwatchstatsCommand extends LenoxCommand {
  constructor(client) {
    super(client, {
      name: 'overwatchstats',
      group: 'searches',
      memberName: 'overwatchstats',
      description: 'Shows you overwatch-stats about a Overwatch player',
      format: 'overwatch {profile, quickplay, competitive} {BATTLETAG}',
      aliases: ['owstats'],
      examples: ['overwatch profile Monkeyyy11#2761'],
      clientpermissions: ['SEND_MESSAGES'],
      userpermissions: [],
      shortDescription: 'Games',
      dashboardsettings: true
    });
  }

  run(msg) {
    const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
    const lang = require(`../../languages/${langSet}.json`);

    const arg = msg.content.split(' ').slice(2).join(' ');
    const validation = ['profile', 'quickplay', 'competitive'];
    const margs = msg.content.split(' ');

    if (typeof margs[1] !== 'undefined');

    if (!margs[0]) return msg.reply(lang.overwatchstats_missinginput).then((m) => m.delete(30000));
    if (!margs[1]) return msg.reply(lang.overwatchstats_error).then((m) => m.delete(30000));
    if (!arg.includes('#')) return msg.reply(lang.overwatchstats_accounterror).then((m) => m.delete(15000));
    if (arg.split('#').length > 6) return msg.reply(lang.overwatchstats_incorrecttag).then((m) => m.delete(15000));

    for (let i = 0; i < margs.length; i += 1) {
      if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
        if (margs[1].toLowerCase() === 'profile') {
          OWStats.load(arg)
            .then((data) => {
              if (!data.body.eu.stats.quickplay.overall_stats.avatar) {
                return msg.reply(lang.overwatchstats_battleneterror).then((m) => m.delete(15000));
              }

              const profile = lang.overwatchstats_profile.replace('%user', arg);
              const profilestats = lang.overwatchstats_profilestats.replace('%stars', data.body.eu.stats.competitive.overall_stats.prestige).replace('%level', data.body.eu.stats.competitive.overall_stats.level).replace('%rank', data.body.eu.stats.competitive.overall_stats.comprank);

              const embed = new Discord.MessageEmbed()
                .setAuthor(profile, data.body.eu.stats.competitive.overall_stats.avatar)
                .setDescription(profilestats)
                .setThumbnail(data.body.eu.stats.competitive.overall_stats.avatar)
                .setColor('#0066CC');
              msg.channel.send({
                embed
              }).catch(console.error);
            }).catch(() => msg.channel.send(`${lang.overwatchstats_errorrequest} ${arg}`));
        }
        else
        if (margs[1].toLowerCase() === 'quickplay') {
          OWStats.load(arg)
            .then((data) => {
              if (!data.body.eu.stats.quickplay.overall_stats.avatar) {
                return msg.reply(lang.overwatchstats_battleneterror).then((m) => m.delete(15000));
              }

              const quickplay = lang.overwatchstats_quickplay.replace('%user', arg);
              const quickplaystats = lang.overwatchstats_quickplaystats.replace('%winrate', data.body.eu.stats.quickplay.overall_stats.win_rate).replace('%gamestotal', data.body.eu.stats.quickplay.overall_stats.games).replace('%wins', data.body.eu.stats.quickplay.overall_stats.wins)
                .replace('%losses', data.body.eu.stats.quickplay.overall_stats.losses);

              const embed = new Discord.MessageEmbed()
                .setAuthor(quickplay, data.body.eu.stats.competitive.overall_stats.avatar)
                .setDescription(quickplaystats)
                .setThumbnail(data.body.eu.stats.competitive.overall_stats.avatar)
                .setColor('#0066CC');
              msg.channel.send({
                embed
              }).catch(console.error);
            }).catch(() => msg.channel.send(`${lang.overwatchstats_errorrequest} ${arg}`));
        }
        else
        if (margs[1].toLowerCase() === 'competitive') {
          OWStats.load(arg)
            .then((data) => {
              if (!data.body.eu.stats.quickplay.overall_stats.avatar) {
                return msg.reply(lang.overwatchstats_battleneterror).then((m) => m.delete(15000));
              }

              const competitive = lang.overwatchstats_competitive.replace('%user', arg);
              const competitivestats = lang.overwatchstats_competitivestats.replace('%winrate', data.body.eu.stats.competitive.overall_stats.win_rate).replace('%gamestotal', data.body.eu.stats.competitive.overall_stats.games).replace('%wins', data.body.eu.stats.competitive.overall_stats.wins)
                .replace('%losses', data.body.eu.stats.competitive.overall_stats.losses);

              const embed = new Discord.MessageEmbed()
                .setAuthor(competitive, data.body.eu.stats.competitive.overall_stats.avatar)
                .setDescription(competitivestats)
                .setThumbnail(data.body.eu.stats.competitive.overall_stats.avatar)
                .setColor('#0066CC');
              msg.channel.send({
                embed
              }).catch(console.error);
            }).catch(() => msg.channel.send(`${lang.overwatchstats_errorrequest} ${arg}`));
        }
      }
    }
  }
};
