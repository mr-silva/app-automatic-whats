import { SearchableFilterDTO } from './SearchableFilterDTO'

export class PagedListFiltersDTO extends SearchableFilterDTO {
  protected page?: number
  protected size?: number

  constructor(page?: number)
  constructor(page?: number, size?: number)
  constructor(page?: number, size?: number, query?: string)
  constructor(page?: number, size?: number, query?: string) {
    super(query)

    this.page = page
    this.size = size
  }

  public getPage(): number {
    let page = 1
    if (typeof this.page !== 'undefined' && this.page > 0) {
      page = this.page
    }

    return page
  }

  public setPage(page: number): this {
    this.page = page
    return this
  }

  public getSize(): number {
    let size = 15
    if (typeof this.size !== 'undefined' && this.size > 0) {
      size = this.size
      if (this.size > 100) {
        size = 100
      }
    }

    return size
  }

  public setSize(size: number): this {
    this.size = size
    return this
  }
}
