import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller('pokemons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getPokemons')
  getAllPokemons(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Observable<string[]> {
    return this.appService.getAllPokemons(limit, page, search);
  }
}
