import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_KEYS } from '@app/common/constants';

@Command('remind', {
  description: 'Remind open talk host to send recording',
  usage: '!remind',
})
export class RemindCommand extends CommandMessage {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    super();
  }

  execute(args: string[], message: ChannelMessage) {
    if (args[0] === 'stop') {
      return this.onStopRemind();
    }
    this.onRemindUsers(args);
    const messageContent = `🏓 Pong!`;
    return this.replyMessageGenerate({ messageContent }, message);
  }

  onRemindUsers(users: string[]) {
    console.log('🚀 ~ RemindCommand ~ onRemindUsers ~ users:', users);
  }

  onStopRemind() {
    return this.redisClient.del(REDIS_KEYS.OPEN_TALK);
  }
}
