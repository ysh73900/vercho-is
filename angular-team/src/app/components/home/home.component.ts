import { Component, OnInit } from '@angular/core';
import { UserNoPW } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userString: any;
  userNoPW: UserNoPW;
  card: any;
  kakao = (window as any).kakao;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userString = localStorage.getItem('userNoPW');
    this.userNoPW = JSON.parse(this.userString);
    
    if (this.userNoPW == null) {
      return
    } else {
      this.authService
      .getCard({ username: this.userNoPW.username })
      .subscribe((data) => {
        if (data.success) {
          this.card = data.card;
          localStorage.setItem('card', this.card)
        } else {
          return;
        }
      });
    }
  }




}
