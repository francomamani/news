import {Component, OnInit} from '@angular/core';
import {NewsService} from '../services/news.service';
import {News} from '../models/news';
import {Comment} from "../models/comment";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  // news: News[] = []
  news: Array<News> = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.newsService.getAll()
      .subscribe((news: Array<News>) => {
        this.news = news;
      });
  }

  toggleComments(news: News) {
    news.show_comments = !news.show_comments;
    if (news.show_comments) {
      this.newsService.getCommentsById(news.id)
        .subscribe((comments) => {
          news.comments = comments;
          if (localStorage.getItem('comments')) {
            let comments: Comment[] = JSON.parse(localStorage.getItem('comments')!.toString());
            comments = comments.filter((comment) => comment.news_id === news.id);
            news.comments = [...news.comments, ...comments];
          }
        });
    } else {
      news.comments = [];
    }
  }

  addComment(news: News) {
    if (news.new_comment.trim().length === 0) return;
    const new_comment = new Comment(news.id, "Invitado", news.new_comment);
    if (localStorage.getItem('comments')) {
      let comments: Comment[] = JSON.parse(localStorage.getItem('comments')!.toString());
      comments = [...comments, new_comment];
      localStorage.setItem('comments', JSON.stringify(comments));
    } else {
      let comments: Comment[] = [new_comment];
      localStorage.setItem('comments', JSON.stringify(comments));
    }
    news.new_comment = '';
    news.show_comments = false;
    this.toggleComments(news);
  }

}
