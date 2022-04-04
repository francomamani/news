import {DateTime} from 'luxon';

export class Comment {
  constructor(
    public news_id: number,
    public author: string,
    public content: string,
    public avatar: string = 'assets/person.png',
    public published_at: Date = DateTime.now().toJSDate()
  ) {
  }
}
