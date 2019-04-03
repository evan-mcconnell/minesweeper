import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() {}
  public rows;
  public columns;
  difficulty = "easy";
  boardWithBombs = [];
  totalBombs = 0;

  ngOnInit() {

    console.log(this.getBoardSize());
    this.populateBombs()
    this.findBombs();
    console.log("total bombs: ", this.totalBombs);
  }
  getBoardSize() {
    if (this.difficulty == "easy") {
      this.rows = 8;
      this.columns = 8;
      return "easy";
    }
  }
  populateBombs(){
    for(let i = 0; i< this.rows; i++){
      let array = [];
      for(let j = 0; j< this.columns; j++) {
        if(!this.placeBomb()) {
          console.log("working");
          array.push(false)
        } else {
          this.totalBombs++
          array.push("bomb")
        }
      }
      this.boardWithBombs.push(array)
    }
    console.log(this.boardWithBombs);
  }
  placeBomb() {
    let bombPlacement = Math.floor(Math.random() * 100 + 1)
    return bombPlacement <= 10 ? true : false;
  }


  checkTop(row, column, bottomRow, rightColumn) {
    let total = 0
    if(row == 0) {
      return 0;
    } else {
      if(column == 0) {
        let above = this.boardWithBombs[row - 1];
        let middle = above[column];
        let right = above[column + 1]
        if(middle === 'bomb') {
          total += 1;
        }
        if(right === 'bomb') {
          total += 1;
        }
      } else if(row === rightColumn) {
        let above = this.boardWithBombs[row - 1];
        let left = above[column - 1]
        let middle = above[column];
        if(left === 'bomb') {
          total += 1;
        }
        if(middle === 'bomb') {
          total += 1;
        }
      }
        else {
        let above = this.boardWithBombs[row - 1];
        let left = above[column - 1]
        let middle = above[column];
        let right = above[column + 1]
        if(middle === 'bomb') {
          total += 1;
        }
        if(right === 'bomb') {
          total += 1;
        }
        if(left === 'bomb') {
          total += 1;
        }
      }
    }
    return total;
  }

  checkMiddle(row, column, bottomRow, rightColumn) {
    let total = 0
    if(column == 0) {
      let i = this.boardWithBombs[row];
      let right = i[column + 1]
      if(right === 'bomb') {
        total += 1;
      }
    } else if(column === rightColumn) {
      let i = this.boardWithBombs[row];
      let left = i[column - 1]
      if(left === 'bomb') {
        total += 1;
      }
    } else {
      let i = this.boardWithBombs[row];
      let left = i[column - 1]
      let right = i[column + 1]
      if(left === 'bomb') {
        total += 1;
      }
      if(right === 'bomb') {
        total += 1;
      }
    }
    return total;
  }

  checkBottom(row, column, bottomRow, rightColumn) {
    let total = 0
    if(row === bottomRow) {
      return 0;
    } else {
      if(column == 0) {
        let bottom = this.boardWithBombs[row + 1];
        let middle = bottom[column];
        let right = bottom[column + 1]
        if(middle === 'bomb') {
          total += 1;
        }
        if(right === 'bomb') {
          total += 1;
        }
      } else if(row === rightColumn) {
        let bottom = this.boardWithBombs[row + 1];
        let left = bottom[column - 1]
        let middle = bottom[column];
        if(left === 'bomb') {
          total += 1;
        }
        if(middle === 'bomb') {
          total += 1;
        }
      }
        else {
        let bottom = this.boardWithBombs[row + 1];
        let left = bottom[column - 1]
        let middle = bottom[column];
        let right = bottom[column + 1]
        if(middle === 'bomb') {
          total += 1;
        }
        if(right === 'bomb') {
          total += 1;
        }
        if(left === 'bomb') {
          total += 1;
        }
      }
    }
    return total;

  }



  findBombs() {
    let topRow = 0;
    let bottomRow = this.boardWithBombs.length - 1;
    let leftColumn = 0;
    let rightColumn = this.boardWithBombs[0].length - 1;

    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        var total = 0;
        if ( this.boardWithBombs[i][j] !== "bomb") {
          total = total + this.checkTop(i, j, bottomRow, rightColumn);
          total += this.checkMiddle(i, j, bottomRow, rightColumn);
          total += this.checkBottom(i, j, bottomRow, rightColumn);
          total !== 0 ? this.boardWithBombs[i][j]= total : false;
        }
      }
    }
    console.log(total);
  }
}
