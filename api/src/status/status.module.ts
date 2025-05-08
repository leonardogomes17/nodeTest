import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusModel } from "./status.model";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";


@Module({
imports: [StatusModule, TypeOrmModule.forFeature([StatusModel])],
providers: [StatusService],
controllers: [StatusController],

})
export class StatusModule {}