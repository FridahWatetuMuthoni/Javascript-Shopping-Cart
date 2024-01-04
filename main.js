let shop = document.getElementById("shop");

let shop_items_data = [
  {
    id: 1,
    name: "Casual Shirt",
    price: 45,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-1.jpg",
  },
  {
    id: 2,
    name: "Office Shirt",
    price: 100,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-2.jpg",
  },
  {
    id: 3,
    name: "T Shirt",
    price: 25,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-3.jpg",
  },
  {
    id: 4,
    name: "Mens Suit",
    price: 300,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-4.jpg",
  },
  {
    id: 5,
    name: "Casual Shirt",
    price: 45,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-4.jpg",
  },
  {
    id: 6,
    name: "Office Shirt",
    price: 100,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-3.jpg",
  },
  {
    id: 7,
    name: "T Shirt",
    price: 25,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-2.jpg",
  },
  {
    id: 8,
    name: "Mens Suit",
    price: 300,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    img: "./Assets/images/img-1.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let generateShop = () => {
  return (shop.innerHTML = shop_items_data
    .map((item) => {
      let search =
        cart.find((element) => {
          return element.id == item.id;
        }) || [];
      return `
    <div class="item" id=product-id-${item.id}>
          <img width="223" src="${item.img}" alt="image-one" />
          <div class="details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price-quantity">
              <h2>$${item.price}</h2>
              <div class="buttons">
                <i onclick = "increment(${
                  item.id
                })" class="fa-solid fa-plus"></i>
                <p id=${item.id} class="quantity" >
                ${search.item === undefined ? 0 : search.item}
                </p>
                <i onclick = "decrement(${
                  item.id
                })" class="fa-solid fa-minus"></i>
                <i></i>
              </div>
            </div>
          </div>
        </div>
    `;
    })
    .join(""));
};

generateShop();

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
  localStorage.setItem("cart", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((item) => {
    return item.id === id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculate_total();
};

let calculate_total = () => {
  let cart_amount = document.getElementById("cart-amount");
  let total = 0;
  cart.forEach((item) => {
    total += item.item;
  });
  let sum = cart
    .map((element) => element.item)
    .reduce((prev, next) => prev + next, 0);
  console.log(sum);
  cart_amount.innerHTML = total;
};

calculate_total();
