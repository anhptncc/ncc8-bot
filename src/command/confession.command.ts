import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { Ncc8Service } from '@app/services/ncc8.service';

@Command('confession', {})
export class ConfessionCommand extends CommandMessage {
  constructor(private ncc8Service: Ncc8Service) {
    super();
  }

  async execute(args: string[], message: ChannelMessage) {
    if (!args.length) {
      await this.ncc8Service.openConfessionForm(message);
      return;
    }

    const messageContent = `Gửi confession thành công! Cảm ơn bạn đã chia sẻ ❤️`;
    await this.ncc8Service.sendConfession(args.join(' '));
    return this.replyMessageGenerate({ messageContent }, message);
  }
}
