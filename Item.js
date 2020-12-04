class Item{
  constructor(name, price) {
    this.name = name;
    this.price = parseFloat(price);
  }
  getHTML() {
    return `
    <tr>
    <td>
    ${this.name}
    </td>
    <td>
    ${this.price}
    </td>
    </tr>
    `
  }
}