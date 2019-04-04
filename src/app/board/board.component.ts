import { Component, OnInit, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private renderer: Renderer2) {}
  public rows;
  public columns;
  difficulty = "easy";
  boardWithBombs = [];
  totalBombs = 0;
  display = "square";
  box = "";
  selectedElement = null;
  class: string;

  ngOnInit() {

    this.getBoardSize();
    this.populateBombs()
    this.findBombs();
  }
  getBoardSize() {
    if (this.difficulty == "easy") {
      this.rows = 8;
      this.columns = 8;
      return "easy";
    }
  }
  checkContent() {
    if (this.display === "square") {
    return this.display;
    }
  }
  check(col) {
  }
  populateBombs(){
    for(let i = 0; i< this.rows; i++){
      let array = [];
      for(let j = 0; j< this.columns; j++) {
        if(!this.placeBomb()) {
          array.push("")
        } else {
          this.totalBombs++
          array.push("bomb")
        }
      }
      this.boardWithBombs.push(array)
    }
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
    console.log("Total Bombs:", total);
  }
  getClasses(column, i, j) {
    let unique = i + (j * 100);
    if (column === "") {
      return `${unique} empty square `;
    } else {
      return ` ${unique} square`;
    }
  }


  toggleClass(event: any, ourClass: string) {
    this.empty(event, ourClass)
    const hasClass = event.target.classList.contains(ourClass);
    if(hasClass) {
      this.renderer.removeClass(event.target, ourClass);
    } else {
      this.renderer.addClass(event.target, 'revealed');


    }
  }


  empty(event: any, ourClass: string) {
    let hasClass = parseInt(event.target.classList[0]);
    let hasAEmptyClass = event.target.classList[1];
    console.log(hasAEmptyClass);
    if(hasClass === 0) {
      hasClass = -5000;
    }
    if(hasClass) {
      if (hasClass === -5000) {
        hasClass = 0;
      }
      let topLeft = hasClass - 101
      let topMiddle = hasClass - 100;
      let topRight = hasClass - 99;
      let left = hasClass - 1;
      let right = hasClass + 1;
      let bottomLeft = hasClass + 99;
      let bottomMiddle = hasClass + 100;
      let bottomRight = hasClass + 101;
      let array = [topLeft, topMiddle, topRight, left, right, bottomLeft, bottomMiddle, bottomRight];
      let check = [];
      let alreadyChecked = [];
      array = this.checkGrid(array);
      if(hasAEmptyClass === 'empty') {
        for(let i = 0; i < array.length; i++) {
          const current = array[i].toString();

          const currentElement = document.getElementsByClassName(current);
          let hasEmptyClass = currentElement[0].classList.contains("empty");
          if(hasEmptyClass) {
            check.push(array[i])
            console.log("empty?", hasEmptyClass)
          }
        }
      }
      this.clear(check, event, array);
      console.log("Empty Elements:", check);
    }
  }



  clear(check, event, array) {
    let alreadyChecked = [];
    let needCheck = [];
    var grid;
    for(let i = 0; i < check.length; i++) {
      let current = check[i];
      let currentElement = document.getElementsByClassName(current);
      let className = 'empty';
      currentElement[0].classList.add('revealed');
      alreadyChecked.push(current);
      grid = this.checkGrid(array)
      needCheck.push(grid);
    }
    console.log(needCheck);


  }

  checkGrid(array) {
    let topRow = 0;
    let bottomRow = this.boardWithBombs.length - 1;
    let leftColumn = 0;
    let rightColumn = this.boardWithBombs[0].length - 1;
    let e = 0;
    for(let i = 0; i < array.length; i++) {
      let rounded = Math.round(array[i]/100)*100 - 1;
      if(e < 3) {
        if(array[i] < 0) {
          array.splice(i, 1);
          i--;
        } else if((array[i] - Math.round(array[i]/100)*100) > rightColumn) {
          array.splice(i, 1);
          i--;
        } else if(array[i] === rounded) {
          array.splice(i, 1);
          i--;
        }
      }else if(e < 5) {
        if(array[i] === rounded) {
          array.splice(i, 1);
          i--;
        } else if((array[i] - Math.round(array[i]/100)*100) > rightColumn) {
          array.splice(i, 1);
          i--;
        }
      } else {
        if(array[i] === rounded) {
          array.splice(i, 1);
          i--;
        } else if((Math.round(array[i]/100) + 1) > bottomRow) {
          array.splice(i, 1);
          i--;
        } else if((array[i] - Math.round(array[i]/100)*100) > rightColumn) {
          array.splice(i, 1);
          i--;
        }
      }
      e++;
  }
  console.log(array);
  return array;

}
}
