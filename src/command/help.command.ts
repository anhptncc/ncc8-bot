import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';

@Command('help', {
  description: 'Shows available commands and their usage',
  usage: '!help [command]',
  category: 'General',
  aliases: ['h', 'commands'],
})
export class HelpCommand extends CommandMessage {
  constructor() {
    super();
  }

  execute(args: string[], message: ChannelMessage) {
    const messageContent = `**Available Commands:**\n` + `Coming soon\n` + ``;

    return this.replyMessageGenerate(
      {
        messageContent,
        mk: [{ type: 'pre', s: 0, e: messageContent.length }],
      },
      message,
    );
  }
}
