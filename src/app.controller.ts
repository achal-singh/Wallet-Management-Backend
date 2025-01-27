import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
// import { Request } from 'express';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getType(): string {
    // console.log('Q: ', type);
    return this.appService.getHello();
  }

  @Get(':id')
  getHello(@Param('id') id: string): string {
    // console.log('REQ: ', params);

    console.log('PARAM: ', id);
    console.log(this.appService.getHello());
    return this.appService.getHello();
  }
}
