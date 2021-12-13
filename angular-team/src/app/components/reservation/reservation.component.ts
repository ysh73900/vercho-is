import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  kakao = (window as any).kakao;
  map: any;
  companys: any;
  comparecardStr: any;
  cardsdata: any;
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }
  

  ngOnInit(): void {





    this.onMap();
    // this.comparecardStr = localStorage.getItem("comparecardStr");
    // const comparecardArr = JSON.parse(this.comparecardStr);
    // this.companys = comparecardArr;
    // console.log(comparecardArr);
  

  }

  ngDoCheck(): void{

    this.comparecardStr = localStorage.getItem("comparecardStr");
    const comparecardArr = JSON.parse(this.comparecardStr);
    this.companys = comparecardArr;
    console.log(this.companys);
  }

  onMap() {
    var authService = this.authService;
    var cardsdata = this.cardsdata;
    const container = document.querySelector('#map');
    const options = {
      center: new this.kakao.maps.LatLng(37.713316, 126.890156),
      level: 13,
    };

    var map = new this.kakao.maps.Map(container, options);

    const marker = new this.kakao.maps.Marker({
      position: map.getCenter(),
    });

    

    marker.setMap(map);

    this.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      infowindow.close();
      
      marker.setPosition(latlng);
      authService.getCompanyList().subscribe((cards) => {
        cardsdata = cards;
        var comparecard: (any)[] = [];
        var mymarker = marker.getPosition();
        const lat = mymarker.getLat();
        const lng = mymarker.getLng();

        for (var i = 0, len = cardsdata.length; i < len; i++) {
          var coordsStr = cardsdata[i].avaliablezone;
          // console.log(cardsdata[i].location);
          var coordsArr = JSON.parse(coordsStr);
          var path = coordsArr.map(function (coords) {
              return [coords.lat, coords.lng]
          });
          // console.log(inside([lat, lng], path));
          // console.log(coordsArr);
          // console.log(path);
          if (inside([lat, lng], path) == true) {
            comparecard.push(cardsdata[i]);
            
          }
        }
        console.log(comparecard);
        var comparecardStr = JSON.stringify(comparecard);
        localStorage.setItem('comparecardStr', comparecardStr);
      });
      

      // 다각형 안에 좌표가 포함되는지 비교하는 알고리즘
      function inside(point, vs) {
        var x = point[0],
          y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0],
            yi = vs[i][1];
          var xj = vs[j][0],
            yj = vs[j][1];

          var intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      }
    });
    
   

    const iwContent =
      '<div class="text-center" style="width:300px;">마커를 클릭하면 업체목록이 생성됩니다.</div>';
    // 인포윈도우 생성
    const infowindow = new this.kakao.maps.InfoWindow({
      content: iwContent,
    });

    this.kakao.maps.event.addListener(marker, 'mouseover', function () {
      infowindow.open(map, marker);
      
    });

    this.kakao.maps.event.addListener(marker, 'mouserout', function () {
      infowindow.close();
    });

    

    this.kakao.maps.event.addListener(marker, 'click', function () {
      const Mysidebar: any = document.getElementById('mySidebar');
      const margin: any = document.getElementById('main');
      const Listhead: any = document.querySelector('table');
      infowindow.close();
      Mysidebar.style.width = '500px';
      Mysidebar.style.opacity = '1';
      Listhead.style.opacity = '1';
      margin.style.marginLeft = '300px';

      
    });
    

    

      // authService.getCompanyList().subscribe((cards) => {
      //   cardsdata = cards;
      //   var comparecard: (any)[] = [];
      //   var mymarker = marker.getPosition();
      //   const lat = mymarker.getLat();
      //   const lng = mymarker.getLng();

      //   for (var i = 0, len = cardsdata.length; i < len; i++) {
      //     var coordsStr = cardsdata[i].avaliablezone;
      //     // console.log(cardsdata[i].location);
      //     var coordsArr = JSON.parse(coordsStr);
      //     var path = coordsArr.map(function (coords) {
      //         return [coords.lat, coords.lng]
      //     });
      //     // console.log(inside([lat, lng], path));
      //     // console.log(coordsArr);
      //     // console.log(path);
      //     if (inside([lat, lng], path) == true) {
      //       comparecard.push(cardsdata[i]);
            
      //     }
      //   }
      //   console.log(comparecard);
      //   var comparecardStr = JSON.stringify(comparecard);
      //   localStorage.setItem('comparecardStr', comparecardStr);
      // });

      // // 다각형 안에 좌표가 포함되는지 비교하는 알고리즘
      // function inside(point, vs) {
      //   var x = point[0],
      //     y = point[1];

      //   var inside = false;
      //   for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      //     var xi = vs[i][0],
      //       yi = vs[i][1];
      //     var xj = vs[j][0],
      //       yj = vs[j][1];

      //     var intersect =
      //       yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      //     if (intersect) inside = !inside;
      //   }
      //   return inside;
      

      // var coordsArr = JSON.parse(coordsStr);
      // var path = coordsArr.map(function (coords) {
      //   return new kakao.maps.LatLng(coords.lat, coords.lng);
      // });

      // console.log(mymarker);
      // console.log(typeof (coordsStr));
      // console.log(path);
    



  }
  

  // getCompany() {
  //   this.authService.getCompanyList().subscribe((cards) => {
  //     if (cards.success) {
  //       this.cards = cards;

  //     }  else {
  //       this.flashMessage.show(data.msg, {
  //         cssClass: 'custom-success',
  //         timeout: 3000,
  //       });
  //     }
  //   })
  // };
}