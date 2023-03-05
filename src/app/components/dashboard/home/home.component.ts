import { Component } from '@angular/core';
import { timeInterval } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading = true;

  constructor(private loadingService: LoadingService,){}

  ngOnInit() {
    this.loadingService.show(); 

    setTimeout(() => {
      this.loadingService.hide(); 
    }, 3000);
   
  }

}
