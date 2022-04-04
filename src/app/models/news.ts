import {DateTime} from 'luxon';
import {Comment} from "./comment";

export class News {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public new_comment: string = '',
    public published_at: Date = DateTime.now().toJSDate(),
    public show_comments: boolean = false,
    public comments: Comment[] = []
  ) {
  }
}
