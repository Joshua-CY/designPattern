interface paymentInterface {
  pay(amount: Array<number>): void;
}


class creditPayment implements paymentInterface { //具體結帳
  private paymentType = 'Credit';

  pay(amounts: Array<number>) {
    let totalAmount = amounts.reduce((a, b) => a + b);
    let calAmount = Math.trunc(totalAmount * 0.8);
    console.log('此次使用' + this.paymentType + '結帳，折抵後金額為:' + calAmount);
  }
}


class LinePayPayment implements paymentInterface { //具體結帳
  private paymentType = 'LinePay';

  pay(amounts: Array<number>) {
    let totalAmount = amounts.reduce((a, b) => a + b);
    let calAmount = totalAmount - (Math.trunc(totalAmount / 1000) * 100);
    console.log('此次使用' + this.paymentType + '結帳，折抵後金額為:' + calAmount);
  }
}


class otherPayment implements paymentInterface { //具體結帳
  private paymentType = 'OtherPay';

  pay(amounts: Array<number>) {
    let totalAmount = amounts.reduce((a, b) => a + b);
    console.log('此次使用' + this.paymentType + '結帳，折抵後金額為:' + totalAmount);
  }
}


class paymentFactory {
  create(paymentType: string): paymentInterface {
    switch (paymentType) {
      case 'Credit':
        return new creditPayment();
      case 'LinePay':
        return new LinePayPayment();
      default:
        return new otherPayment();
    }
  }
}

const factory = new paymentFactory;
factory.create('Credit').pay([1500, 2000, 2500]);
factory.create('LinePay').pay([1500, 2000, 2500]);
factory.create('TaiwanPay').pay([1500, 2000, 2500]);