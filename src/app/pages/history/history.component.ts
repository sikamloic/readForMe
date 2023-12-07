import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LocalstorageService } from '../../shared/services/localstorage.service';
import { HistoryService } from '../../shared/services/history.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {

  user: any
  message: string
  result: any
  isChecking: boolean
  constructor(
    private localStorage: LocalstorageService,
    private historyService: HistoryService
  ){
    if(this.localStorage.get('user')) this.user = this.localStorage.get('user')
    this.getAllHistory()
  }

  getAllHistory(){
    this.historyService.getAllByUserId({'userId': this.user.id}, {'sortBy':''})
    .subscribe({
      next: (res: any) =>{
        this.result = res.results
      },
      error: (err: any) =>{
        this.message = err.error.message
      }
    })
  }

  getPubllicHistory(){
    this.historyService.getAllByUserId({'public': true}, {'sortBy':''})
    .subscribe({
      next: (res: any) =>{
        this.result = res.results
        console.log(this.result)
      },
      error: (err: any) =>{
        this.message = err.error.message
      }
    })
  }

  delete(id: string){
    this.historyService.delete(id)
    .subscribe({
      next: (res: any) =>{
        this.getAllHistory()
      },
      error: (err: any) =>{
        this.message = err.error.message
      }
    })
  }

  visibility(id: string, show: boolean){
    this.historyService.visibility(id, show)
    .subscribe({
      next: (res: any) =>{
        this.getAllHistory()
      },
      error: (err: any) =>{
        this.message = err.error.message
      }
    })
  }

  getDate(date: string){
    let tmp = new Date(date)
    return `${tmp.getDate()} - ${this.getMonth(tmp.getMonth())} - ${tmp.getFullYear()}`
  }

  getMonth(i: number){
    let month = ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juill", "Aout", "Sept", "Oct", "Nov", "Dec"]
    return month[i]
  }

  change(event: any){
    console.log(event.target.checked)
    if(!event.target.checked) this.getAllHistory()
    else this.getPubllicHistory()
  }

  ngOnInit(): void {
    
  }

}
