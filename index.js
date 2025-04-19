const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

// أمثلة على أوامر البوت
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }

    if (message.content === '!help') {
        message.reply('اكتب أحد الأوامر التالية: !userinfo, !serverinfo, !avatar');
    }
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!userinfo')) {
        const user = message.author;
        const embed = {
            title: `User Info - ${user.username}`,
            fields: [
                { name: 'Username', value: user.username },
                { name: 'ID', value: user.id },
                { name: 'Created At', value: user.createdAt.toDateString() },
            ],
        };
        message.channel.send({ embeds: [embed] });
    }
});

// جعل البوت يدخل إلى السيرفر ويصبح جاهزاً
client.login('YOUR_BOT_TOKEN'); // استبدل 'YOUR_BOT_TOKEN' بتوكن البوت
