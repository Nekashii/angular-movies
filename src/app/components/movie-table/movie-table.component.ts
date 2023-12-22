import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-movie-table',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
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
  filter: string = ''
  private readonly _paginationMargin: number = 2

  get pagesToShow(): number[] {
    
    const pagesToShow: number[] = []
    for (
      let iterator = this.currentPage - this._paginationMargin, count = 0;
      count < this._paginationMargin * 2 + 1 && iterator <= this.totalPages;
      iterator++
    ) {
      if (iterator < 1 || iterator > this.totalPages) continue
      
      pagesToShow.push(iterator)
      count++      
    }
    return pagesToShow
  }

  setPage(page: number): void 
  {
    this.pageChange.emit(page)
    if (this.filter) this.filter = ''
  }

  setFilter(criteria?: string): void {
    this.filterChange.emit(criteria)
  }
}
