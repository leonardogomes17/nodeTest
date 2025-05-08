import { Body, Controller,  Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { StatusModel } from "./status.model";
import { StatusSchema } from "./status.schema";
import { StatusService } from "./status.service";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Get()
    public async getStatus(): Promise <{ data: StatusModel[] }>{
        return this.statusService.getStatus();
    }

    @Post()
    public async postStatus(@Body(ValidationPipe) body: StatusSchema) 
    : Promise <{ data: StatusModel }>{
        return this.statusService.postStatus(body);
    }
}