import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { Ncc8Service } from '@app/services/ncc8.service';

@Command('ncc8schedule', {})
export class InternalScheduleCommand extends CommandMessage {
  private readonly NCC8_CHANNEL_ID = process.env.NCC8_CHANNEL_ID;

  constructor(private readonly ncc8Service: Ncc8Service) {
    super();
  }

  execute(args: string[], message: ChannelMessage) {
    if (message.channel_id === this.NCC8_CHANNEL_ID) {
      this.ncc8Service.sendWorkSchedule();
      return;
    }
  }
}
