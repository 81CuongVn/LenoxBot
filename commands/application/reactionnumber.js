const LenoxCommand = require('../LenoxCommand.js');

module.exports = class reactionnumberCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'reactionnumber',
			group: 'application',
			memberName: 'reactionnumber',
			description: 'Defines the number of reactions required to accept or reject an application',
			format: 'reactionnumber {number}',
			aliases: [],
			examples: ['reactionnumber 2'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Settings',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		const number = args.slice();

		const current = lang.reactionnumber_current.replace('%reactionnumber', msg.client.provider.getGuild(msg.message.guild.id, 'application').reactionnumber);
		if (number.length === 0 && msg.client.provider.getGuild(msg.message.guild.id, 'application').reactionnumber !== '') return msg.channel.send(current);

		if (number.length > 1) return msg.channel.send(lang.reactionnumber_error);
		if (isNaN(number)) return msg.channel.send(lang.reactionnumber_noinput);
		if (number < 2) return msg.channel.send(lang.reactionnumber_cannotbe0orless);

		const currentApplication = msg.client.provider.getGuild(msg.message.guild.id, 'application');
		currentApplication.reactionnumber = number;
		await msg.client.provider.setGuild(msg.message.guild.id, 'application', currentApplication);

		const changed = lang.reactionnumber_changed.replace('%newreactionnumber', number);
		msg.channel.send(changed);
	}
};