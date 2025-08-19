class Cart {
  constructor() {
    this.items = [];
  }

  add(product, quantity) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
  }

  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  update(productId, quantity) {
    const item = this.items.find(i => i.id === productId);
    if (item) item.quantity = quantity;
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  }

  showCart() {
    if (this.items.length === 0) return "Carrinho vazio!";
    return this.items
      .map(item => `${item.nome} (x${item.quantity}) - R$ ${(item.preco * item.quantity).toFixed(2)}`)
      .join("\n") + `\n\nTotal: R$ ${this.getTotal().toFixed(2)}`;
  }
}

module.exports = Cart;