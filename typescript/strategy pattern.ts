interface payInterface {
  pay(detailAmount: Array<number>): void;
}


class payWithCredit implements payInterface {
  public pay(detailAmount: Array<number>): void {
   let totalAmount = detailAmount.reduce((a,b)=>a+b);
   let finalAmount = Math.trunc(totalAmount*0.8);
   console.log('此次使用 Credit 結帳，折抵後金額為:' + finalAmount);
  }
}

class payWithLinePay implements payInterface {
  public pay(detailAmount: Array<number>): void {
      let totalAmount = detailAmount.reduce((a,b)=>a+b);
      let finalAmount = totalAmount - (Math.trunc(totalAmount/1000) * 100);
    console.log('此次使用 LinePay 結帳，折抵後金額為:' + finalAmount);
  }
}


class payment {
  private payStrategy!: payInterface;

  constructor(payStrategy: payInterface) {
    this.payStrategy =  payStrategy;
  }

  public execute(detailAmount: Array<number>): void {
    this.payStrategy.pay(detailAmount);
  }
}


// Credit
new payment(new payWithCredit()).execute([1500,2000,2500]);
// LinePay
new payment(new payWithLinePay()).execute([1500,2000,2500]);
