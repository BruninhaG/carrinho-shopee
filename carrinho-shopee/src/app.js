const inquirer = require("inquirer");
const chalk = require("chalk");
const products = require("./products");
const Cart = require("./cart");

const cart = new Cart();

async function menu() {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Escolha uma opção:",
      choices: [
        "1. Listar produtos",
        "2. Adicionar produto ao carrinho",
        "3. Remover produto do carrinho",
        "4. Atualizar quantidade",
        "5. Ver carrinho",
        "6. Finalizar compra"
      ]
    }
  ]);

  switch (option[0]) {
    case "1":
      console.log(chalk.blue("\nProdutos disponíveis:"));
      products.forEach(p => console.log(`${p.id} - ${p.nome} - R$ ${p.preco.toFixed(2)}`));
      break;

    case "2":
      await addProduct();
      break;

    case "3":
      await removeProduct();
      break;

    case "4":
      await updateProduct();
      break;

    case "5":
      console.log(chalk.green("\nSeu carrinho:"));
      console.log(cart.showCart());
      break;

    case "6":
      console.log(chalk.yellow("\nCompra finalizada! Obrigado por comprar na Shopee Clone 🛒"));
      process.exit();
  }

  await menu();
}

async function addProduct() {
  const { id, quantity } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Escolha o produto:",
      choices: products.map(p => ({ name: `${p.nome} - R$ ${p.preco.toFixed(2)}`, value: p.id }))
    },
    {
      type: "number",
      name: "quantity",
      message: "Quantidade:",
      default: 1
    }
  ]);

  const product = products.find(p => p.id === id);
  cart.add(product, quantity);
  console.log(chalk.green("\nProduto adicionado ao carrinho!"));
}

async function removeProduct() {
  if (cart.items.length === 0) {
    console.log(chalk.red("Carrinho vazio!"));
    return;
  }
  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Escolha o produto para remover:",
      choices: cart.items.map(p => ({ name: `${p.nome} (x${p.quantity})`, value: p.id }))
    }
  ]);

  cart.remove(id);
  console.log(chalk.red("Produto removido do carrinho!"));
}

async function updateProduct() {
  if (cart.items.length === 0) {
    console.log(chalk.red("Carrinho vazio!"));
    return;
  }
  const { id, quantity } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Escolha o produto para atualizar:",
      choices: cart.items.map(p => ({ name: `${p.nome} (x${p.quantity})`, value: p.id }))
    },
    {
      type: "number",
      name: "quantity",
      message: "Nova quantidade:",
      default: 1
    }
  ]);

  cart.update(id, quantity);
  console.log(chalk.blue("Quantidade atualizada!"));
}

menu();