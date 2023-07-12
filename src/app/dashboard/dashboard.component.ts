import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstructionWorkService } from '../construction-work.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  hasError: boolean = false;

  cards = [
    {img: '../../assets/icons8-plus.svg', content: 'New RoadWork'},
    {img: '../../assets/icons8-close.svg', content: 'Close Roadwork'},
    {img: '../../assets/icons8-list-48.png', content: 'Log Overview'},
    {img: '../../assets/icons8-user-account-26.png', content: 'Contact List'},
    {img: '../../assets/icons8-settings.svg', content: 'App Settings'},
    {img: '../../assets/icons8-account-50.png', content: 'Account Settings'},
  ]

  constructionWorks: ConstructionWork[] = [];

  constructor(private router: Router, private constructionWorkService: ConstructionWorkService) {}

  ngOnInit(): void {
    this.getConstructionWorks();
  }

  isStatusOK(): boolean {
    for (let work of this.constructionWorks) {
      if (work.status !== 'OK') {
        return false;
      }
    }
    return true;
  }

  getConstructionWorks() {
    this.constructionWorkService.getAllConstructionWork()
      .subscribe((works: ConstructionWork[]) => {
        this.constructionWorks = works;
      });
  }

  handleCardClick(card: any): void {
    switch (card.content) {
      case 'New RoadWork': {
        this.router.navigate(['/add-roadwork']);
        break;
      }
      // case 'Status': {
      //   this.router.navigate(['/status']);
      //   break;
      // }
      case 'Close Roadwork': {
        this.router.navigate(['/close-roadwork']);
        break;
      }
      case 'Contact List': {
        // this.router.navigate(['/add-roadwork']);
        alert('Card clicked' + card.content);
        break;
      }
      case 'App Settings': {
        // this.router.navigate(['/add-roadwork']);
        alert('Card clicked' + card.content);
        break;
      }
      case 'Account Settings': {
        // this.router.navigate(['/add-roadwork']);
        alert('Card clicked' + card.content);
        break;
      }
    }
  }

  handleCardClickStatus(): void {
    this.router.navigate(['/status']);
  }
}

interface ConstructionWork {
  id: number;
  street: string;
  city: string;
  startDate: string;
  endDate: string;
  status: string;
}
