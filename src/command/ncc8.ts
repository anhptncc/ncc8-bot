import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { Ncc8Service } from '@app/services/ncc8.service';

@Command('ncc8', {})
export class InternalScheduleCommand extends CommandMessage {
  private readonly NCC8_CHANNEL_ID = process.env.NCC8_CHANNEL_ID;

  constructor(private readonly ncc8Service: Ncc8Service) {
    super();
  }

  async execute(args: string[], message: ChannelMessage) {
    const command = args[0];
    const content = args.slice(1).join(' ').trim();

    switch (command) {
      case 'schedule':
        if (message.channel_id === this.NCC8_CHANNEL_ID) {
          this.ncc8Service.sendWorkSchedule();
        }
        break;

      case 'confession':
        if (content) {
          await this.ncc8Service.sendConfession(content);
          return this.replyMessageGenerate(
            {
              messageContent: `Gửi confession thành công! Cảm ơn bạn đã chia sẻ ❤️`,
            },
            message,
          );
        } else {
          await this.ncc8Service.openConfessionForm(message);
        }
        break;

      case 'request':
        await this.ncc8Service.openRequestForm(message);
        break;

      case 'help':
        return this.handleHelp(message);
      default:
        break;
    }
  }

  handleHelp(message: ChannelMessage) {
    let ncc8PrivateCmd = '';
    if (message.channel_id === this.NCC8_CHANNEL_ID) {
      ncc8PrivateCmd = `*ncc8 schedule: Nhắc nhở lịch làm việc hàng tuần của NCC8\n`;
    }
    const messageContent =
      `**Available Commands:**\n` +
      `*ncc8 confession: Mở form gửi confession đến NCC8 (ẩn danh)\n` +
      `*ncc8 confession [nội dung]: Gửi confession đến NCC8 (ẩn danh)\n` +
      `*ncc8 request: Mở form gửi yêu cầu bài hát đến NCC8\n` +
      `*ncc8 help: Hiển thị trợ giúp\n` +
      ncc8PrivateCmd;

    return this.replyMessageGenerate(
      {
        messageContent,
        mk: [{ type: 'pre', s: 0, e: messageContent.length }],
      },
      message,
    );
  }
}
