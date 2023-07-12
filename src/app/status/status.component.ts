import { Component, HostListener, OnInit } from '@angular/core';
import { ConstructionWorkService } from '../construction-work.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  selectedConstructionWork: any;
  selectedCard: any;
  isMobileView: boolean = false;
  
  // leftSideWidth = '30%';
  // rightSideWidth = '70%';
  leftSideFlex = '0 0 30%';
  rightSideFlex = '1 1 70%';

  searchText: string = '';

  constructionWorks: ConstructionWork[] = [];
  retrievedSigns: Signs[] = [];

  constructor(private constructionWorkService: ConstructionWorkService) { }

  ngOnInit(): void {
    this.getConstructionWorks();
    this.checkViewport();
    // this.updateConstructionWorkStatuses();
  }


  getConstructionWorks() {
    this.constructionWorkService.getAllConstructionWork()
      .subscribe((works: ConstructionWork[]) => {
        this.constructionWorks = works;
      });

  }

  retrieveSignsByWorkId(card: any) {
    this.selectedConstructionWork = card;
    this.constructionWorkService.getSignsByWorkId(card.id)
      .subscribe((signs) => {
        this.retrievedSigns = signs;
      });
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
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  showDetails(card: any) {
    this.selectedCard = card;
  }

  showSigns(card:any){

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

  goBackSigns() {
    this.selectedConstructionWork = null;
    this.selectedCard = null;
  }

  hasIssues(workId: number): boolean {
    const relatedSigns = this.retrievedSigns.filter(sign => sign.workId === workId);
    return relatedSigns.some(sign => sign.issue.trim() !== '');
  }

  // updateConstructionWorkStatuses() {
  //   this.constructionWorks.forEach(work => {
  //     this.constructionWorkService.getSignsByWorkId(work.id)
  //       .subscribe((signs: Signs[]) => {
  //         const hasIssues = signs.some(sign => sign.issue !== ' ');
  //         work.status = hasIssues ? 'ISSUE' : 'OK';
  //       });
  //   });
  // }

}

interface ConstructionWork {
  id: number;
  street: string;
  city: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Signs {
  signId: number;
  workId:number;
  issueDate: string;
  issueTime: string;
  issue: string;
}