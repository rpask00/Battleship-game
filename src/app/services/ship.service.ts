import { Injectable } from '@angular/core';
import { Cord, Ship, Ships } from '../models/Cord';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, merge, take } from 'rxjs/operators';
import { WebSocektService } from './web-socekt.service';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  private cordsArr: Cord[] = [];
  private cordsArrCopy: Cord[] = [];
  mergedShipsObs = new BehaviorSubject([]);
  hitsssss = new BehaviorSubject([])
  myId: string;
  ships: Ships;


  constructor(
    private webSocketSv: WebSocektService
  ) {
    webSocketSv.listen('me').pipe(take(1)).subscribe((id: any) => this.myId = id.mySocket)
    for (let x = 1; x < 11; x++)
      for (let y = 1; y < 11; y++) {
        this.cordsArr.push({ x, y });
        this.cordsArrCopy.push({ x, y });
      }
  }

  getHit = (cord: Cord): Observable<boolean> => {
    this.hitsssss.asObservable().pipe(take(1)).subscribe(hits => this.hitsssss.next(hits.concat([cord])))

    return this.mergedShipsObs.asObservable().pipe(
      map(merged => merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1)
    )
  }

  get cords() {
    return this.cordsArrCopy;
  }

  get alphabet() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  }

  get indexes() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  generateShips() {
    this.hitsssss.next([])
    this.cordsArr = [].concat(this.cordsArrCopy);
    this.ships = {
      ship4: this.generateShip(4),
      ship3a: this.generateShip(3),
      ship3b: this.generateShip(3),
      ship2a: this.generateShip(2),
      ship2b: this.generateShip(2),
      ship2c: this.generateShip(2),
      ship1a: this.generateShip(1),
      ship1b: this.generateShip(1),
      ship1c: this.generateShip(1),
      ship1d: this.generateShip(1),
    }
    this.mergeShips()
    return this.ships
  }

  private mergeShips() {
    let mergedShipsArr = []
    for (let shipName in this.ships) {
      mergedShipsArr = mergedShipsArr.concat(this.ships[shipName].cords)
    }
    this.mergedShipsObs.next(mergedShipsArr)
  }

  private clearAreaAround(ship: Ship) {
    let cordsToDelete: Cord[] = [];
    ship.cords.forEach(cord => {
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (cord.x + x <= 10 && cord.y + y <= 10 && cord.x + x > 0 && cord.y + y > 0) {
            cordsToDelete.push(({ x: cord.x + x, y: cord.y + y }))
          }
        }
      }
    })

    cordsToDelete.forEach(cord => {
      let indexOfCordToDelete = this.cordsArr.findIndex(cordOrigin => {
        return cordOrigin.x == cord.x && cordOrigin.y == cord.y
      })
      if (indexOfCordToDelete > -1)
        this.cordsArr.splice(indexOfCordToDelete, 1)
    })
  }


  private generateShip(shipLenght: number) {
    let isVertical = Math.random() < 0.5;
    let index: Cord
    let ship = new Ship()

    do {
      ship.clearCords()
      index = { x: this.randN(0, 10 - shipLenght + 1), y: this.randN(0, 10 - shipLenght + 1) }

      ship.addCord(index)
      for (let i = 0; i < shipLenght - 1; i++) {
        if (isVertical)
          ship.addCord({ x: index.x, y: ship.lastCord.y + 1 })
        else
          ship.addCord({ x: ship.lastCord.x + 1, y: index.y })
      }
    } while (ship.cords.map(this.isFieldEmpty.bind(this)).indexOf(false) !== -1)

    this.clearAreaAround(ship)
    return ship
  }

  private isFieldEmpty(cord: Cord) {
    if (!cord) return false
    return this.cordsArr.findIndex(c => c.x == cord.x && c.y == cord.y) !== -1
  }


  private randN(start?: number, end?: number): number {
    start = start || 0;
    end = end || 10;
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

}