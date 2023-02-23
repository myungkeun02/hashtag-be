import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async chatgpt(keyword): Promise<any> {
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const api = new ChatGPTAPI({
      apiKey: this.configService.get('APIKEY'),
    });
    console.log(keyword);

    const res = await api.sendMessage(
      `인스타그램에서 ${keyword}이라는 주제로 글을 작성하고 싶은데, 쓸만한 해시태그를 한국어로 10개 이상 추천해줘`,
    );
    console.log(res.text);
    return res.text;
  }
}
