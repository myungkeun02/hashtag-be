import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { KeywordData } from './keyword.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('hashtag')
  async postHashtag(@Body() keywordData: KeywordData): Promise<any> {
    const keyword = keywordData.keyword;

    const gptResult = await this.appService.chatgpt(keyword);

    return gptResult;
  }
}
