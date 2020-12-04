class Order {
    constructor() {
        this.subTotal = 0;
        this.tax = 0.03;
        this.tip = 0.2;
        this.isComplete = false;
        this.observers = []
        this.items = []
    }
    getItems() {
      return this.items
    }
    addToOrder(item) {
        this.items.push(item)
        this.subTotal += item.price
    }
    clearItems() {
      this.items = []
      this.subTotal = 0;
    }
    getTotal() {
        return this.subTotal * (1 + this.tax + this.tip)
    }
    pay() {
        this.askForTip()
    }

    // Part of the observer pattern implementation to alert everyone subscribed
    alertObservers() {
        this.observers.forEach(observer => {
          observer.close()
          })
    }

    // Part of the observer pattern implementation to allow objects to subscribe
    subscribe(observer) {
        this.observers.push(observer)
    }

    askForTip() {
        // Display Tip html popup
        const modal = document.getElementById('modal')
        modal.innerHTML = `
        <label>Please enter tip amount (%): <input id="tipInput"></input></label>
        <button onclick="user.order.storeTip()">Confirm Tip</button>
        `
        modal.style.visibility = 'visible'
    }
    storeTip() {
        const modal = document.getElementById('modal')
        modal.style.visibility = 'hidden'
        this.tip = parseFloat(document.getElementById('tipInput').value)/100
        if (this.tip > 1 || this.tip < 0) {
            this.tip = 0.2
        }
        this.askForPayment()
    }
    askForPayment() {
        // Display Payment html popup
        const modal = document.getElementById('modal')
        modal.innerHTML = `
        <p>Order Subtotal: ${this.subTotal}</p>
        <p>Order Tip: ${this.tip}</p>
        <p>Order Tax: ${this.tax}</p>
        <p>Order Total: ${this.getTotal()}</p>

        <label>Card number: <input id="cardNumber"></input></label>
        <label>Expiry date: <input id="expiryDate"></input></label>
        <label>CVV: <input id="cvv"></input></label>
        <label>Name: <input id="name"></input></label>

        <button onclick="user.order.storePayment()">Confirm Payment</button>
        `
        modal.style.visibility = 'visible'
        const payment = new Payment(1234567890, "12/23", 234, 'Apple Bees')
    }
    storePayment() {
      let cardNumber = document.getElementById('cardNumber').value
      let expiryDate = document.getElementById('expiryDate').value
      let cvv = document.getElementById('cvv').value
      let name = document.getElementById('name').value
      const payment = new Payment(cardNumber, expiryDate, cvv, name)
      console.log(payment)
      this.isComplete = true;
      this.alertObservers()
    }
}