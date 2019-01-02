const LenoxCommand = require('../LenoxCommand.js');

module.exports = class togglechatfilterCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'togglechatfilter',
			group: 'administration',
			memberName: 'togglechatfilter',
			description: 'Set the chat filter on or off',
			format: 'togglechatfilter',
			aliases: [],
			examples: ['togglechatfilter'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Chatfilter',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		if (!msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter')) {
			await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', {
				chatfilter: 'false',
				array: []
			});
		}

		if (msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter').chatfilter === 'false') {
			const currentChatfilter = msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter');
			currentChatfilter.chatfilter = 'true';
			await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', currentChatfilter);

			return msg.channel.send(lang.togglechatfilter_activated);
		}
		const currentChatfilter = msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter');
		currentChatfilter.chatfilter = 'false';
		await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', currentChatfilter);

		return msg.channel.send(lang.togglechatfilter_disabled);
	}
};