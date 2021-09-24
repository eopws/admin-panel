import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ban } from './ban.entity';
import { BansService } from './bans.service';

@Module({
  providers: [BansService],
  imports: [TypeOrmModule.forFeature([Ban])]
})
export class BansModule {}
