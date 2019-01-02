const LenoxCommand = require('../LenoxCommand.js');

module.exports = class skipvoteCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'skipvote',
			group: 'music',
			memberName: 'skipvote',
			description: 'Toggles the skipvote function',
			format: 'skipvote',
			aliases: [],
			examples: ['skipvote'],
			clientPermissions: ['SEND_MESSAGES', 'SPEAK'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Skip',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const prefix = msg.client.provider.getGuild(msg.message.guild.id, 'prefix');

		if (!msg.client.provider.getGuild(msg.message.guild.id, 'skipvote')) {
			await msg.client.provider.setGuild(msg.message.guild.id, 'skipvote', 'false');
		}

		if (msg.client.provider.getGuild(msg.message.guild.id, 'skipvote') === 'false') {
			await msg.client.provider.setGuild(msg.message.guild.id, 'skipvote', 'true');

			const activated = lang.skipvote_activated.replace('%prefix', prefix);
			return msg.channel.send(activated);
		}
		await msg.client.provider.setGuild(msg.message.guild.id, 'skipvote', 'false');
		return msg.channel.send(lang.skipvote_disabled);
	}
};