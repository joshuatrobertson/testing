import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from './card-data.model';
import { RestartGameComponent } from './restart-game/restart-game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Images pulled from site. The number * 2 represents playing cards for the user
  cardImages = [
    'pDGNBK9A0sk'
    // 'fYDrhbVlV1E',
    // 'qoXgaF27zBc',
    // 'b9drVB7xIOI',
    // 'TQ-q5WAVHj0'
  ];

  userFirstTime = 0;
  userSecondTime = 0;
  returnTime;

  // Add a time component
  time = 0;
  interval;
  display;
  timerStart = false;

  // Allow the user 2 turns
  userSecondGame = false;

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;



  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }



  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  startTimer(): void {
    console.log('=====>');
    if (this.timerStart === false) {
      this.interval = setInterval(() => {
        if (this.time === 0) {
          this.time++;
        } else {
          this.time++;
        }
        this.display = this.transform( this.time);
      }, 1000);
    }
    this.timerStart = true;
    }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  resetTimer(): void {
    this.timerStart = false;
    this.time = 0;
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          // Stop timer and assign the times for each run
          clearInterval(this.interval);
          if (this.userSecondGame === false) {
            this.userFirstTime = this.time;
            this.userSecondGame = true;
          }
          else {
            this.userSecondTime = this.time;
            this.displayTimes();
          }



          const dialogRef = this.dialog.open(RestartGameComponent, {
            disableClose: true
        });
          dialogRef.afterClosed().subscribe(() => {
            this.resetTimer();
            this.restart();
          });
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }

  displayTimes(): void {
    this.returnTime = ('The first time was: ' + this.userFirstTime + '\nThe second time was: ' + this.userSecondTime);
  }

}
