import { Component, HostListener, OnInit } from '@angular/core';
import { ConstructionWorkService } from '../construction-work.service';

@Component({
  selector: 'app-close-roadwork',
  templateUrl: './close-roadwork.component.html',
  styleUrls: ['./close-roadwork.component.css']
})
export class CloseRoadworkComponent implements OnInit {

  selectedCard: any;
  isMobileView: boolean = false;
  // leftSideWidth = '30%';
  // rightSideWidth = '70%';
  leftSideFlex = '0 0 30%';
  rightSideFlex = '1 1 70%';

  constructionWorks: ConstructionWork[] = [];
  searchText: string = '';

  constructor(private constructionWorkService: ConstructionWorkService) { }

  cards = [
    { name: 'Card 1', status: 'Status 1', image: 'path/to/image1.jpg' },
    { name: 'Card 2', status: 'Status 2', image: 'path/to/image2.jpg' },
    // Add more cards here
  ];

  ngOnInit(): void {
    this.getConstructionWorks();
    this.checkViewport()
  }


  getConstructionWorks() {
    this.constructionWorkService.getAllConstructionWork()
      .subscribe((works: ConstructionWork[]) => {
        this.constructionWorks = works;
      });
  }

  deleteConstructionWork(selectedWork: ConstructionWork) {
    this.constructionWorkService.deleteConstructionWork(selectedWork.id)
      .subscribe(() => {
        this.constructionWorks = this.constructionWorks.filter(work => work.id !== selectedWork.id);
      });
    this.selectedCard = null;  
  }

  startResize(event: MouseEvent) {
    event.preventDefault();
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  }

  resize = (event: MouseEvent) => {
    const splitPageWidth = document.querySelector('.split-page')?.clientWidth || 0;
    const x = event.pageX;
    const leftSideWidth = ((x / splitPageWidth) * 100).toFixed(2);
    this.leftSideFlex = `0 0 ${leftSideWidth}%`;
    this.rightSideFlex = `1 1 ${100 - Number(leftSideWidth)}%`;
    // const splitPageWidth = document.querySelector('.split-page')?.clientWidth || 0;
    // const x = event.pageX;
    // const leftSideWidth = ((x / splitPageWidth) * 100).toFixed(2);
    // this.leftSideWidth = `${leftSideWidth}%`;
    // this.rightSideWidth = `${100 - Number(leftSideWidth)}%`;
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  showDetails(card: any) {
    this.selectedCard = card;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 767; // Adjust the breakpoint as needed
  }

  goBack() {
    this.selectedCard = null;
  }

  get filteredConstructionWorks(): ConstructionWork[] {
    if (!this.searchText) {
      return this.constructionWorks;
    } else {
      // Search text entered, filter construction works based on the search text
      const searchText = this.searchText.toLowerCase();
      return this.constructionWorks.filter(work => {
        return work.street.toLowerCase().includes(searchText) || work.city.toLowerCase().includes(searchText);
      });
    }
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


