import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorEntity } from "./author.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],

})
export class AuthorModule {}
