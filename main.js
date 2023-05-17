let product = {
  crazy: {
    name: 'Crazy',
    price: 31000,
    amount: 0,
    img: 'images/products/burger-1.png',
    get totalSum() {
      return this.price * this.amount
    }
  },
  light: {
    name: 'Light',
    price: 26000,
    amount: 0,
    img: 'images/products/burger-2.png',
    get totalSum() {
      return this.price * this.amount
    }
  },
  cheeseburger: {
    name: 'CheeseBurger',
    price: 29000,
    amount: 0,
    img: 'images/products/burger-3.png',
    get totalSum() {
      return this.price * this.amount
    }
  },
  dburger: {
    name: 'dBurger',
    price: 24000,
    amount: 0,
    img: 'images/products/burger-4.png',
    get totalSum() {
      return this.price * this.amount
    }
  }
}


let burgersBtns = document.querySelectorAll('.burgers__item-add'),
    cartBtn = document.querySelector('.nav__right-btn'),
    cartAmount = document.querySelector('.nav__right-amount'),
    cartList = document.querySelector('.nav__right-list'),
    cartListItems = document.querySelector('.nav__right-list-items'),
    cartClose = document.querySelector('.nav__right-list-close'),
    cartTotalPrice = document.querySelector('.nav__right-list-price');
    
  
burgersBtns.forEach((btn) => {
    btn.addEventListener('click', function()  {
      plus(this)
    })
})

function plus(btn) {
  // closest() - позволяет нам подключится к указаному ближайшему родителю 
  let parent = btn.closest('.burgers__item')
  let parentId = parent.getAttribute('id')
  product[parentId].amount++
  basket()
}




cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))


function basket() {
    let productArray = []
    for(let key in product) {
      let burger = product[key]
      const productBurger = document.querySelector(`#${key}`)
      const productCount = productBurger.querySelector('.burgers__item-count')
      if(burger.amount > 0) {
        productArray.push(burger)
        productCount.classList.add('active')
        productCount.innerHTML = burger.amount
      }else {
        productCount.classList.remove('active')
        productCount.innerHTML = 0
      }
      
    }
    let allCount = totalCountProduct()
    if(allCount > 0) {
      cartAmount.classList.add('active')
    }else {
      cartAmount.classList.remove('active')
    }
    cartAmount.innerHTML = allCount
    
    cartListItems.innerHTML = ''
    
    productArray.forEach((product) => {
      cartListItems.innerHTML += createItem(product)
    })
    
    cartTotalPrice.innerHTML = totalSumProduct()
    
}


function totalCountProduct() {
  let total = 0;
  for(let key in product) {
    total += product[key].amount
  }
  return total
}

function totalSumProduct() {
  let sum = 0
  for(let key in product) {
    sum += product[key].totalSum
  }
  return sum + ' сумм'
}


function createItem(product) {
    let { name, img, amount, totalSum: price } = product
    return `    <div class="nav__right-item" id="${name.toLowerCase()}-burger">
                  <div class="nav__item-left">
                    <img src="${img}" alt="">
                    <div class="nav__item-left-info">
                      <p class="nav__item-left-name">${name}</p>
                      <p class="nav__item-left-price">${price} сум</p>
                    </div>
                  </div>
                  <div class="nav__item-right">
                    <button data-symbol="-" class="nav__item-btn minus">-</button>
                    <output class="nav__item-count">${amount}</output>
                    <button data-symbol="+" class="nav__item-btn plus">+</button>
                  </div>
                </div>`
}

window.addEventListener('click', (event) => {
  // event.target - возвращает тот элемент на который нажимает пользователь
  
  if(event.target.classList.contains('nav__item-btn')) {
    const dataValue = event.target.getAttribute('data-symbol')
    const parentItem = event.target.closest('.nav__right-item')
    if(parentItem) {
      const parentId = parentItem.getAttribute('id').split('-')[0]
      if(dataValue == '-') {
        product[parentId].amount--
      }else if(dataValue == '+') {
        product[parentId].amount++
      }
      basket()
    }
  }
})

