import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Movie } from './models/movie.model'
import { MovieService } from './services/movie.service'
import { Subscription } from 'rxjs'
import { MovieTableComponent } from './components/movie-table/movie-table.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MovieTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  _subscription!: Subscription
  movies: Movie[] = []
  currPage: number = 1
  totalPages: number = 1

  constructor(private readonly _movieService: MovieService) {}

  ngOnInit(): void {
    this._subscription = this._movieService.getByPage().subscribe({
      next: ({ results, page, total_pages }) => {
        this.movies = results
        this.currPage = page
        this.totalPages = total_pages
      },
    })
  }

  onPageChange(page: number): void {
    this._movieService.getByPage(page)
  }

  onFilterChange(criteria?: string): void {
    this._movieService.filter(criteria)
  }
  
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
