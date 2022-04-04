import {Injectable} from '@angular/core';
import newsJson from '../fake/news.json';
import commentJson from '../fake/comments.json';

import {Observable, of} from 'rxjs';
import {News} from '../models/news';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() {
  }

  getAll(): Observable<News[]> {
    const newsArray = newsJson.map((news) => new News(news.id, news.title, news.author));
    return of(newsArray);
  }

  /**
   * Devolver los comentarios dado el news_id
   * @param news_id {number}
   * **/
  getCommentsById(news_id: number): Observable<Comment[]> {
    const commentsArray = commentJson.filter((comment) => {
      return news_id === comment.news_id;
    }).map((comment) => new Comment(comment.news_id, comment.author, comment.content, comment.avatar));
    return of(commentsArray);
  }
}
