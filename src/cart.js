const label = document.getElementById("label");
const shopping_cart = document.getElementById("shopping-cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let generate_cart_items = () => {
  if (cart.length !== 0) {
    return (shopping_cart.innerHTML = cart
      .map((element) => {
        let { id, item } = element;
        let search =
          shop_items_data.find((element) => {
            return element.id == id;
          }) || [];
        return `
      <section class="cart-item">
        <img width="100" src=${search.img} alt=${search.name}/>
        <section class="details">

        <div class="title-price-x">
          <h4>
          <p>${search.name}</p>
          <p class="card-item-price">$${search.price}</p>
          </h4>
          <i onclick="remove_item(${id})" class="fa fa-times"></i>
        </div>
        <div class="buttons">
          <i onclick = "increment(${search.id})" 
          class="fa-solid fa-plus"></i>
          <p id=${search.id} class="quantity">${item}</p>
          <i onclick = "decrement(${search.id})"
          class="fa-solid fa-minus"></i>
        </div>
        <h3>$${item * search.price}</h3>
        </section>
      </section>
      `;
      })
      .join(""));
  } else {
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="home_btn">Back to Homepage</button>
    </a>
    `;
    shopping_cart.innerHTML = ``;
  }
};

generate_cart_items();

let calculate_total = () => {
  let cart_amount = document.getElementById("cart-amount");
  let total = 0;
  cart.forEach((item) => {
    total += item.item;
  });
  cart_amount.innerHTML = total;
};

let increment = (id) => {
  let search = cart.find((element) => {
    return element.id === id;
  });

  if (search === undefined) {
    let item = {
      id: id,
      item: 1,
    };
    cart.push(item);
  } else {
    search.item += 1;
  }
  generate_cart_items();
  update(id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

let decrement = (id) => {
  let search = cart.find((element) => {
    return element.id === id;
  });

  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(id);
  cart = cart.filter((element) => {
    return element.item !== 0;
  });
  generate_cart_items();
  localStorage.setItem("cart", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((item) => {
    return item.id === id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculate_total();
  total_bill();
};

calculate_total();

let remove_item = (id) => {
  cart = cart.filter((element) => {
    return element.id !== id;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  generate_cart_items();
  calculate_total();
  total_bill();
};

let total_bill = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((element) => {
        let { id, item } = element;
        let search = shop_items_data.find((item) => {
          return item.id === id;
        });
        return item * search.price;
      })
      .reduce((prev, next) => prev + next, 0);
    label.innerHTML = `
    <h2>Total Bill: $${amount}</h2>
    <button class="checkout" >Checkout</button>
    <button onclick="clear_cart()" class="remove_all">Clear Cart</button>
    `;
  }
};

total_bill();

let clear_cart = () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  generate_cart_items();
  calculate_total();
};
