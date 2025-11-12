import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'redis-13298.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
          port: 13298,
          password: '0l0vFhU1lMp99fq7nHnBcDCYCbtaSIpY',
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
