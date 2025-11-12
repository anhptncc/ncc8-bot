import { HelpCommand } from '@app/command/help.command';
import { PingCommand } from '@app/command/ping.command';
import { RemindCommand } from '@app/command/remind.command';
import { ClientConfigService } from '@app/config/client.config';
import { BotGateway } from '@app/gateway/bot.gateway';
import { EventListenerChannelMessage } from '@app/listeners';
import { CommandService } from '@app/services/command.service';
import { GoogleSheetsService } from '@app/services/google-sheets.service';
import { MessageCommand } from '@app/services/message-command.service';
import { MessageQueue } from '@app/services/message-queue.service';
import { Ncc8Service } from '@app/services/ncc8.service';
import { TasksService } from '@app/services/task.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // TypeOrmModule.forFeature([]),
  ],
  providers: [
    BotGateway,
    ClientConfigService,
    ConfigService,
    CommandService,
    MessageQueue,
    MessageCommand,
    GoogleSheetsService,
    TasksService,
    Ncc8Service,

    // Listeners
    EventListenerChannelMessage,

    // Commands
    HelpCommand,
    PingCommand,
    RemindCommand,
  ],
  controllers: [],
})
export class BotModule {}
