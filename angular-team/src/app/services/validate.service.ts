import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  validateCompanyRegister(card) {
    if (
      card.name == undefined ||
      card.tel == undefined 
    ) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



  comparecard(cardsdata, path, comparecard, lat, lng) {

        for (var i = 0, len = cardsdata.length; i < len; i++) {
          
        var coordsStr = cardsdata[i].avaliablezone;
        // console.log(cardsdata[i].avaliablezone);
        var coordsArr = JSON.parse(coordsStr);
        var path = coordsArr.map(function (coords) {
              return [coords.lat, coords.lng];
        });
        // console.log(inside([lat, lng], path));
          if (this.inside([lat, lng], path) == true) {
          comparecard.push(cardsdata[i].name);
          comparecard.push(cardsdata[i]);
        }

      
        }
    
        // if (inside([lat, lng], path) == true) {
        //   // comparecard.push(cardsdata[i].name);
        //   comparecard.push(cardsdata[i]);
        // }
    }




    // 다각형 안에 좌표 포함하는지 비교하는 알고리즘

    inside(point, vs) {
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

}
