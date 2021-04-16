import { Component, HostListener, OnInit, OnDestroy,AfterViewChecked,AfterViewInit } from '@angular/core';

enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy,AfterViewChecked,AfterViewInit {
 
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode == KEY_CODE.UP_ARROW){
      if((--this.posX)>0){
        let marioImage = document.getElementById("img-"+ (this.posX+1) + "-"+ this.posY) as HTMLImageElement;
        marioImage.src="./assets/blank.png"; 
        let updagedMarioImage = document.getElementById("img-"+ this.posX + "-"+ this.posY) as HTMLImageElement;
        updagedMarioImage.src="./assets/mario.png";   
        this.noOfMoves++;  
        let str = "img-"+ this.posX + "-"+ this.posY;
        let indx = this.randomArray.indexOf(str);
        if (indx > -1) {
            this.randomArray.splice(indx, 1);
          }
        if(this.randomArray.length == 0){
          setTimeout(()=>{ alert("  Game over. Total moves to save princess:"+this.noOfMoves);this.refresh();},10);
        }
        
        }
      else{
        this.posX++;
      }
    }
    else if(event.keyCode == KEY_CODE.DOWN_ARROW){
      if((++this.posX)<=this.inputHeight){
        let marioImage = document.getElementById("img-"+ (this.posX-1) + "-"+ this.posY) as HTMLImageElement;
        marioImage.src="./assets/blank.png"; 
        let updagedMarioImage = document.getElementById("img-"+ this.posX + "-"+ this.posY) as HTMLImageElement;
        updagedMarioImage.src="./assets/mario.png";   
        this.noOfMoves++;  
        let str = "img-"+ this.posX + "-"+ this.posY;
        let indx = this.randomArray.indexOf(str);
        if (indx > -1) {
            this.randomArray.splice(indx, 1);
          }
          if(this.randomArray.length == 0){
            setTimeout(()=>{ alert("  Game over. Total moves to save princess:"+this.noOfMoves);this.refresh();},10);
          }
      }    
      else{
        this.posX--;
      }
    }
    else if(event.keyCode == KEY_CODE.RIGHT_ARROW){
      if((++this.posY)<=this.inputWidth){
        let marioImage = document.getElementById("img-"+ this.posX + "-"+ (this.posY-1)) as HTMLImageElement;
        marioImage.src="./assets/blank.png"; 
        let updagedMarioImage = document.getElementById("img-"+ this.posX + "-"+ this.posY) as HTMLImageElement;
        updagedMarioImage.src="./assets/mario.png";  
        this.noOfMoves++;  
        let str = "img-"+ this.posX + "-"+ this.posY;
        let indx = this.randomArray.indexOf(str);
        if (indx > -1) {
            this.randomArray.splice(indx, 1);
          } 
          if(this.randomArray.length == 0){
            setTimeout(()=>{ alert("  Game over. Total moves to save princess:"+this.noOfMoves);this.refresh();},10);
          }
      }   
      else{
        this.posY--;
      }
     }
    else if(event.keyCode == KEY_CODE.LEFT_ARROW){
      if((--this.posY)>0){
        let marioImage = document.getElementById("img-"+ this.posX + "-"+ (this.posY+1)) as HTMLImageElement;
        marioImage.src="./assets/blank.png"; 
        let updagedMarioImage = document.getElementById("img-"+ this.posX + "-"+ this.posY) as HTMLImageElement;
        updagedMarioImage.src="./assets/mario.png";   
        this.noOfMoves++; 
        let str = "img-"+ this.posX + "-"+ this.posY;
        let indx = this.randomArray.indexOf(str);
        if (indx > -1) {
            this.randomArray.splice(indx, 1);
          }

          if(this.randomArray.length == 0){
            setTimeout(()=>{ alert("  Game over. Total moves to save princess:"+this.noOfMoves); this.refresh();},10);
           
          }
      } 
      else{
        this.posY++;
      }
      }
  }

  title = 'maze-game';
  HorizontalSquares: any[];
  verticalSquares: any[];
  initialRow: any;
  initialCol:any;
  boxes:any = [];
  inputWidth:any;
  inputHeight:any;
  posX:any;
  posY:any;
  noOfMoves:number = 0;
  randomArray:any = [];
  exceptionCase:boolean = false;

  ngOnInit(){
    this.inputWidth = Number(prompt("Please enter board width", "2"));
    this.inputHeight = Number(prompt("Please enter board height", "2"));
    if((this.inputWidth == 0)||(this.inputHeight == 0)||((this.inputHeight==1)&&(this.inputWidth == 1))||(isNaN(this.inputWidth))||(isNaN(this.inputHeight))){
      alert("please enter a valid width and height");
      this.refresh();
    }
    this.HorizontalSquares = Array(this.inputWidth).fill(null);
    this.verticalSquares = Array(this.inputHeight).fill(null);

    this.initialRow = Math.round(this.inputHeight/2);
    this.initialCol = Math.round(this.inputWidth/2);

    this.posX =  this.initialRow;
    this.posY = this.initialCol;

    if(this.inputHeight ==1){
      this.exceptionCase = true;
    }
  }

  ngAfterViewInit(){
    let marioImage = document.getElementById("img-"+ this.initialRow + "-"+ this.initialCol) as HTMLImageElement;
    marioImage.src="./assets/mario.png";
    let images = document.getElementsByClassName("image");
    for(let image=0; image<images.length; image++) {
    this.boxes.push(images[image].id);
    }
    let indx = this.boxes.indexOf("img-"+ this.initialRow + "-"+ this.initialCol);
    if (indx > -1) {
        this.boxes.splice(indx, 1);
    }
    for(let i = 0; i< this.inputWidth;i++){
      if(this.exceptionCase){
        this.exceptionCase=false;
        continue;
      }
      let randomItem = this.boxes[Math.floor(Math.random()*this.boxes.length)];
      this.randomArray.push(randomItem);
      let marioImage = document.getElementById(randomItem) as HTMLImageElement;
      marioImage.src="./assets/tortoise.png";
    let indx = this.boxes.indexOf(randomItem);
      if (indx > -1) {
          this.boxes.splice(indx, 1);
        }
    }
  }

  refresh(): void {
    window.location.reload();
  }

  ngAfterViewChecked(){
   
  }

  ngOnDestroy(){
    
  }
}


