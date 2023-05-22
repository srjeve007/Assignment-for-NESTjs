import { Module } from '@nestjs/common';
import { UserdataModule } from './userdata/userdata.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm-config';


@Module({
  imports: [UserdataModule, TypeOrmModule.forRoot( typeOrmConfig),],
  controllers: [],
  providers: [],
})
export class AppModule {}
