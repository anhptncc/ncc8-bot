import { Ncc8Service } from '@app/services/ncc8.service';
import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';

@Command('ping', {
  description: 'Check bot latency and responsiveness',
  usage: '!ping',
  category: 'Utility',
  aliases: ['p'],
})
export class PingCommand extends CommandMessage {
  constructor(private readonly ncc8Service: Ncc8Service) {
    super();
  }
  execute(args: string[], message: ChannelMessage) {
    const messageContent = `🏓 Pong!`;
    this.ncc8Service.remindUsersSendOpenTalkRecording();
    return this.replyMessageGenerate({ messageContent }, message);
  }
}
