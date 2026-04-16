import { Injectable, Logger } from '@nestjs/common';
import { MezonClientService } from './mezon-client.service';
import {
  ApiMessageMention,
  ChannelMessageContent,
  EMarkdownType,
  MezonClient,
} from 'mezon-sdk';
import { GoogleSheetsService } from './google-sheets.service';
import { TextChannel } from 'mezon-sdk/dist/cjs/mezon-client/structures/TextChannel';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

@Injectable()
export class Ncc8Service {
  private readonly logger = new Logger(Ncc8Service.name);
  private client: MezonClient;
  private ncc8Channel: TextChannel;
  private ncc8AudioChannel: TextChannel;
  private readonly NCC8_CHANNEL_ID = process.env.NCC8_CHANNEL_ID;
  private readonly CONFESSION_CHANNEL_ID = process.env.CONFESSION_CHANNEL_ID;
  private readonly NCC8_AUDIO_CHANNEL_ID = process.env.NCC8_AUDIO_CHANNEL_ID;

  constructor(
    private clientService: MezonClientService,
    private readonly sheetsService: GoogleSheetsService,
  ) {
    this.client = clientService.getClient();
    this.initializeChannel();
  }

  ncc8Log(error: unknown, customMsg: string = 'NCC8 service error:') {
    console.error(customMsg, error);
    this.logger.error(customMsg, error);
    this.clientService.sendMessageToUser({
      // send to developer
      userId: '1803263641638670336',
      textContent: JSON.stringify({
        error: customMsg,
        details: error instanceof Error ? error.message : String(error),
      }),
    });
  }

  private async initializeChannel() {
    try {
      this.ncc8Channel = await this.client.channels.fetch(this.NCC8_CHANNEL_ID);
      this.ncc8AudioChannel = await this.client.channels.fetch(
        this.NCC8_AUDIO_CHANNEL_ID,
      );
      console.log('NCC8 channel initialized successfully.');
    } catch (error) {
      this.ncc8Log(error);
    }
  }

  async sendWorkSchedule() {
    try {
      const spreadsheetId = '1CcPJRr9IPs2H3LC9QEVdM1Us3IL1ogduIOpmffXcd9I';
      const sheetName = 'Lịch làm việc';

      const titleRange = `${sheetName}!A3:G3`;
      const contentRange = `${sheetName}!A240:G`;

      const titleData = await this.sheetsService.readSheet(
        spreadsheetId,
        titleRange,
      );
      const titleArray = titleData[0];
      const contentData = await this.sheetsService.readSheet(
        spreadsheetId,
        contentRange,
      );
      const today = dayjs();
      const nextWork = contentData.find(([dateStr]) => {
        if (!dateStr) return false;
        const date = dayjs(dateStr, 'D/M/YYYY', true);
        return date.isValid() && date.isAfter(today, 'day');
      });
      const t = [`### Lịch làm việc NCC8 tuần này`];

      const messages = titleArray.map((title, index) => {
        const msg = `- ${title}: ${nextWork[index] || 'Không có'}`;
        return msg.trim();
      });

      const content: ChannelMessageContent = {
        t: [t, ...messages].join('\n'),
      };

      const mentions: Array<ApiMessageMention> = [
        {
          username: 'here',
        },
      ];

      return this.ncc8Channel.send(content, mentions, [], true);
    } catch (error) {
      this.ncc8Log(error, 'Error sending work schedule:');
    }
  }

  async sendConfession(args: string[]) {
    try {
      const msg = args.join(' ');

      const messageContent =
        `💌 New Confession:\n${msg}` +
        '\n------------------THE END-----------------\n';

      const content: ChannelMessageContent = {
        mk: [{ type: EMarkdownType.PRE, s: 0, e: messageContent.length }],
        t: messageContent,
      };

      return this.ncc8Channel.send(
        content,
        [],
        [],
        false,
        false,
        this.CONFESSION_CHANNEL_ID,
      );
    } catch (error) {
      this.ncc8Log(error, 'Error sending confession message:');
    }
  }

  async remindUploadNcc8Audio() {
    try {
      const content: ChannelMessageContent = {
        t: `🔔 Nhắc nhở các bạn NCC8 upload audio cho tuần này nhé!`,
      };

      const mentions: Array<ApiMessageMention> = [
        {
          username: 'here',
        },
      ];

      return this.ncc8AudioChannel.send(content, mentions, [], true);
    } catch (error) {
      this.ncc8Log(error, 'Error sending audio upload reminder:');
    }
  }

  async remindRecordNcc8Audio() {
    try {
      const content: ChannelMessageContent = {
        t: `🔔 Nhắc nhở các bạn NCC8 record audio cho tuần này nhé!`,
      };

      const mentions: Array<ApiMessageMention> = [
        {
          username: 'here',
        },
      ];

      return this.ncc8Channel.send(content, mentions, [], true);
    } catch (error) {
      this.ncc8Log(error, 'Error sending audio record reminder:');
    }
  }
}
