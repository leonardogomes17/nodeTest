import { Injectable } from "@nestjs/common";
import { Body, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatusModel } from "./status.model";
import { StatusSchema } from "./status.schema";

@Injectable()
export class StatusService {

    constructor(@InjectRepository(StatusModel) private model: Repository<StatusModel>) {}

        public async getStatus(): Promise <{ data: StatusModel[] }>{
            const list = await this.model.find();
            return { data: list };
        }
    

        public async postStatus(@Body(ValidationPipe) body: StatusSchema) 
        : Promise <{ data: StatusModel }>{
            const statusCreate = await this.model.save(body);
            return {data: statusCreate};
        }

}