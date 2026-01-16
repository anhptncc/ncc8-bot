import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Ncc8Service } from './ncc8.service';

@Injectable()
export class TasksService {
  constructor(private readonly ncc8Service: Ncc8Service) {}

  // every Monday 9:00
  @Cron('0 0 9 * * 1', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sendWorkScheduleCron() {
    this.ncc8Service.sendWorkSchedule();
  }

  // every Friday 10:00
  @Cron('0 0 10 * * 5', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  remindUploadNcc8AudioCron() {
    this.ncc8Service.remindUploadNcc8Audio();
  }
}
