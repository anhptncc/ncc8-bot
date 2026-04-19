import { Ncc8Service } from '@app/services/ncc8.service';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from 'mezon-sdk';
import { MessageButtonClicked } from 'mezon-sdk/dist/cjs/rtapi/realtime';

@Injectable()
export class EventListenerMessageButtonClicked {
  private readonly logger = new Logger(EventListenerMessageButtonClicked.name);

  constructor(private readonly ncc8Service: Ncc8Service) {}

  @OnEvent(Events.MessageButtonClicked)
  async handleMessageButtonClicked(
    payload: MessageButtonClicked,
  ): Promise<void> {
    try {
      await this.ncc8Service.ncc8SubmitFormController(payload);
    } catch (error) {
      this.logger.error('Message button clicked processing failed', error);
    }
  }
}
