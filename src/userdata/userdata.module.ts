import { Module } from '@nestjs/common';
import { UserdataController } from './userdata.controller';
import { UserdataService } from './userdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdata } from './userdata.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Userdata])],
  controllers: [UserdataController],
  providers: [UserdataService]
})
export class UserdataModule {}
