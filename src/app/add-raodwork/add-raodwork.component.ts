import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConstructionWorkService } from '../construction-work.service';

@Component({
  selector: 'app-add-raodwork',
  templateUrl: './add-raodwork.component.html',
  styleUrls: ['./add-raodwork.component.css']
})
export class AddRaodworkComponent implements OnInit {

  constructor(private router: Router,private constructionWorkService: ConstructionWorkService) { }

  showImageCont: boolean = false;
  showSignCont: boolean = false;

  newConstructionWork: ConstructionWork = {
    id: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
    street: '',
    city: '',
    startDate: '10.07.23',
    endDate: '28.08.23',
    status: 'OK'
  };

  signsData: Signs[] = [];

  ngOnInit(): void {
  }

  headerText: string = 'New Roadwork';
  showBackArrow: boolean = true;

  showImageContainer() {
    const imageContainer = document.getElementById("imageContainer") as HTMLElement;
    const inputContainer = document.getElementById("InputContainer") as HTMLElement;
    const confirmButton = document.querySelector(".confirm-button") as HTMLElement;
    // const confirmButtonBottom = document.querySelector(".confirm-button-bottom") as HTMLElement;
    const bottombuttonsContainer = document.getElementById("bottom-buttons") as HTMLElement;
  
    if (this.showImageCont == false) {
      imageContainer.style.display = "block";
      confirmButton.style.display = "none";
      inputContainer.style.display = "none";
      bottombuttonsContainer.style.display = "flex"
      this.showImageCont = true;
    }
    else if (this.showImageCont == true){
      imageContainer.style.display = "none";
      confirmButton.style.display = "block";
      inputContainer.style.display = "block";
      bottombuttonsContainer.style.display = "none";
      this.showImageCont = false;
    }
  }

  showSignContainer() {
    const imageContainer = document.getElementById("imageContainer") as HTMLElement;
    const signContainer = document.getElementById("signsContainer") as HTMLElement;
    const bottombuttonsContainer = document.getElementById("bottom-buttons") as HTMLElement;

    if (this.showSignCont == false) {
      imageContainer.style.display = "none";
      bottombuttonsContainer.style.display = "none"
      signContainer.style.display = "block";
      this.showSignCont = true;
    }
    // else if (this.showSignCont == true){
    //   imageContainer.style.display = "none";
    //   confirmButton.style.display = "block";
    //   inputContainer.style.display = "block";
    //   bottombuttonsContainer.style.display = "none";
    //   this.showImageCont = false;
    // }
  }

  placeOnMaster() {
    // document.getElementById('mainImage') as HTMLImageElement.src='../../assets/TestPlan.PNG';
    var img = document.getElementById('QrImage') as HTMLImageElement;
    img.src = "../../assets/TestPlan.PNG"
  }

  handleConfirmCreation() {
    this.router.navigate(['/dashboard']);
  }

  addConstructionWork() {
    this.constructionWorkService.addConstructionWork(this.newConstructionWork,this.signsData)
      .subscribe(() => {
        // Clear form fields after successful addition
        this.newConstructionWork = {
          id:  0,
          street: '',
          city: '',
          startDate: '',
          endDate: '',
          status: 'OK'
        };
      });
      this.router.navigate(['/dashboard']);

  }

  addSign() {
    const newSign: Signs = {
      signId: this.signsData.length + 1,
      workId: this.newConstructionWork.id,
      issueDate: '20.05.23',
      issueTime: '23:35',
      issue: 'Tilt'
    };
    this.signsData.push(newSign);
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

interface Signs {
  signId: number;
  workId:number;
  issueDate: string;
  issueTime: string;
  issue: string;
}
