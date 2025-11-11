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
  handleWeeklyCron() {
    this.ncc8Service.sendWorkSchedule();
  }
}
