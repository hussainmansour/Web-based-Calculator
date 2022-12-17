import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})


export class CalculatorComponent {

  public screenValue: string = '';
  public upperScreenValue: string = '';
  private state: State = State.FirstNumber;
  private number1 :number=0;
  private number2 :number=0;
  private sign = "";
  private res : string = "";

  constructor( private serv : ServService) {
  }


  ngOnInit(): void {
  }

  public digitNumber(number: string){
    if ( this.state == State.Result ) {
      this.reset();
    }
    this.screenValue += number;
  }

  public ToggleSign() {
    if ( this.state == State.Result ) {
      this.reset();return
    }
    else if ( this.screenValue !== '' ) {
      if(this.screenValue[0]!=='-')
        this.screenValue = "-" + this.screenValue;
      else
        this.screenValue = this.screenValue.substring(1);
    }
  }

  public Dot(){
    if ( this.state == State.Result ) {
      this.reset();return;
    }
    for (let i = 0; i < this.screenValue.length; i++) {
      if(this.screenValue[i]=='.')
        return;
    }
    this.screenValue += '.';
  }

  public delete(){
    if ( this.screenValue !== '' ) {
      this.screenValue = this.screenValue.substring(0,this.screenValue.length-1);
    }
  }

  public UniOperation(operation:string){
    if ( this.state == State.Result ) {
      this.reset();return
    }

    let val = "";
    val = this.screenValue + operation;
    this.serv.getRec(val).subscribe((response) => {
      this.showResult2(response.toString());
    })


  }

  public showResult2(response:string){
    if(response === null) {
      this.screenValue = "error";
      this.state=State.Error;
    }
    else{
      this.screenValue = response;
      if(this.number2 === 0) {
        this.number1 =  Number(response);
        this.state = State.FirstNumber;
      }
      else{
        this.number2 = Number(response);
        this.state = State.SecondNumber;
      }
    }
    //this.state = State.SecondNumber;
    console.log(response);
  }

  public digitSign(sign: string) {
    if ( this.screenValue == '' ) {
      return;
    }
    else if(this.state === State.SecondNumber) {

      this.getResult();
      this.sign = sign;
    }
    else 
    {
      this.number1 = parseFloat(this.screenValue);
      this.upperScreenValue = this.number1 + ' ' + sign;
      this.screenValue = '';
      this.sign = sign;
      this.state = State.SecondNumber;
    }

  }

  public getResult() {
    if ( this.screenValue == '' ) {
      return;
    }
    this.number2 = parseFloat(this.screenValue);
    this.upperScreenValue += ' ' + this.number2;
    this.screenValue = '';
    this.res += this.number1;
    this.res += this.sign;
    this.res += this.number2;

    console.log("res = "+this.res);

    this.serv.getResult(this.res).subscribe((response) => {
      this.showResult(response.toString());
    })
  }

  public showResult(response:string){
    if(response === null) {
      this.screenValue = "error";
      this.state=State.Error;
    }
    else{
      this.res = response;
      this.screenValue = response;
      this.number1 = Number(response);
    }
    this.number2 = 0;
    this.sign="";
    this.state = State.FirstNumber;
    this.res="";
    console.log(response);
  }

  public reset() {
    this.state = State.FirstNumber;
    this.screenValue = '';
    this.upperScreenValue = '';
    this.number1 = 0;
    this.number2 = 0;
    this.sign = "";
    this.res="";
  }

  public isSignButtonsEnabled() {
    return (this.state == State.FirstNumber || this.state == State.Result) ;
  }

  public isResultButtonEnabled() {
    return this.state == State.SecondNumber ;
  }

  public isDisabled(){
    return this.state == State.Error;
  }

}
export enum State {
  FirstNumber,
  SecondNumber,
  Result,
  Error,
}


