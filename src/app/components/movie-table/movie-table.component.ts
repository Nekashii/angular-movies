import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-movie-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './movie-table.component.html',
})
export class MovieTableComponent {
  @Input({required: true})
  movies!: Movie[]
  @Input({required: true})
  currentPage!: number
  @Input({required: true})
  totalPages!: number
  @Output()
  pageChange = new EventEmitter<number>()
  @Output()
  filterChange = new EventEmitter<string | undefined>()

  setPage(page: number): void {
    this.pageChange.emit(page)
  }

  setFilter(criteria?: string): void {
    this.filterChange.emit(criteria)
  }
}
