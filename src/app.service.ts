import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { GptEntity } from './gpt.entity';
export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(GptEntity) private readonly gptModel: typeof GptEntity,
    private readonly sequelize: Sequelize,
  ) {
    this.sequelize.addModels([GptEntity]);
  }

  async chatgpt(keyword): Promise<any> {
    // DB 조회를 해서 같은 키워드가 있으면 불러와서 return한다
    const dbResult = await this.getGpt(keyword);
    if (dbResult) {
      return dbResult.chatResult;
    }
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const api = new ChatGPTAPI({
      apiKey: this.configService.get('APIKEY'),
    });
    console.log(keyword);

    const res = await api.sendMessage(
      `인스타그램에서 ${keyword}이라는 주제로 글을 작성하고 싶은데, 쓸만한 해시태그를 한국어로 10개 이상 추천해줘`,
    );
    console.log(res.text);
    await this.saveGpt(keyword, res.text);
    return res.text;
  }

  async getGpt(keyword) {
    const result = await this.gptModel.findOne({
      where: {
        keyword: keyword,
      },
    });
    return result;
  }
  async saveGpt(keyword, gptResult) {
    await this.gptModel.create({
      keyword: keyword,
      chatResult: gptResult,
    });
  }
}
