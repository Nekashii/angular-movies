import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { Movie } from '../models/movie.model'
import { Response } from '../models/response.model'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _currentResponse!: Response<Movie>
  private readonly _responseSubscription = new Subject<Response<Movie>>()

  constructor(private readonly _httpClient: HttpClient) {}

  getByPage(page: number = 1): Observable<Response<Movie>> {
    this._httpClient.get<Response<Movie>>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams({fromObject: {
        include_adult: false,
        include_video: false,
        language: 'enUS',
        page,
        sort_by: 'popularity.desc'
      }})
    }).subscribe({
      next: response => {
        this._responseSubscription.next(response)
        this._currentResponse = response
      },
    })
    return this._responseSubscription.asObservable()
  }

  filter(criteria?: string): void {
    const { results } = this._currentResponse
    this._responseSubscription.next({
      ...this._currentResponse,
      results: results.filter(({ title }) => !criteria || title.toLowerCase().includes(criteria.toLowerCase()))
    })
  }
}
