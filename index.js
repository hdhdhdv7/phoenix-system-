const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

// عند تشغيل البوت
client.once('ready', () => {
    console.log('Bot is online!');
});

// ترحيب رسالة خاصة عند انضمام عضو جديد
client.on('guildMemberAdd', member => {
    member.send(`مرحبًا ${member.user.username}! مرحبًا بك في السيرفر!`);
});

// أوامر عامة
client.on('messageCreate', async (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }

    if (message.content === '!help') {
        const helpEmbed = new EmbedBuilder()
            .setTitle('أوامر البوت')
            .addFields(
                { name: '👑 أوامر إدارية', value: '`ban`, `unban`, `kick`, `unkick`, `mute`, `unmute`, `lock`, `unlock`, `clear`' },
                { name: '👤 أوامر عامة', value: '`userinfo`, `serverinfo`, `ping`, `avatar`' },
                { name: '🎟️ أوامر التذكرة', value: '`/ticket-send`, `/ticket-setup`' }
            )
            .setColor('#00ff00');
        message.channel.send({ embeds: [helpEmbed] });
    }

    if (message.content === '!serverinfo') {
        const guild = message.guild;
        const serverInfo = new EmbedBuilder()
            .setTitle('معلومات السيرفر')
            .addFields(
                { name: 'اسم السيرفر', value: guild.name },
                { name: 'عدد الأعضاء', value: guild.memberCount.toString() },
                { name: 'الأونر', value: guild.owner.user.username },
                { name: 'عمر السيرفر', value: new Date(guild.createdAt).toDateString() }
            )
            .setColor('#ff9900');
        message.channel.send({ embeds: [serverInfo] });
    }

    if (message.content === '!userinfo') {
        const user = message.author;
        const randomId = Math.floor(Math.random() * 900000 + 100000);
        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`معلومات المستخدم: ${user.username}`)
            .addFields(
                { name: 'الاسم', value: user.username },
                { name: 'الهوية', value: user.id },
                { name: 'البلد', value: 'غير محدد' },  // يمكنك تعديل هذه القيمة بناءً على بيانات إضافية
                { name: 'العمر', value: 'غير محدد' },  // يمكنك تعديل هذه القيمة بناءً على البيانات
                { name: 'المهنة', value: 'غير محدد' },  // يمكنك تعديل هذه القيمة بناءً على البيانات
                { name: 'رقم عشوائي', value: randomId.toString() }
            )
            .setColor('#00ccff');
        message.channel.send({ embeds: [userInfoEmbed] });
    }

    if (message.content === '!avatar') {
        const user = message.author;
        message.reply({ content: `${user.username}'s Avatar`, files: [user.displayAvatarURL()] });
    }
});

// أوامر إدارية (بريفكس مرن)
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith("!")) return; // تحديد البريفكس من قبل المستخدم

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ban') {
        // تنفيذ أمر الحظر
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('ليس لديك صلاحيات الحظر!');
        const member = message.mentions.members.first();
        if (member) {
            await member.ban();
            message.reply(`${member.user.tag} تم حظره!`);
        }
    }

    // يمكن إضافة باقي الأوامر الإدارية مثل unban, kick, mute, etc.
});

// تشغيل البوت باستخدام التوكن
client.login('YOUR_BOT_TOKEN');
