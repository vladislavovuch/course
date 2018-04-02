function renderCartItem(item) {
    return `
    <li data-item-id="${item.id}" data-item-qty="1" data-item-price="${item.price}" data-item-total="${item.price}">
        <h5 class="item-name">${item.name}</h5>
        <div class="item-info-wrapper">
            <div class="qty-wrapper">Qty: <span class="item-qty">1</span></div>
            <div class="price-wrapper"> Price: $<span class="item-price">${item.price}</span></div>
            <button class="btn btn-sm btn-outline-danger remove" data-item-id="${item.id}">Remove</button>
        </div>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(rootEl) {
        this.cartEl = rootEl.querySelector(".shopping-cart-list");
        this.totalEl = rootEl.querySelector(".total");
        this.emptyCartEl = rootEl.querySelector(".empty-cart-message");
        this.removeAllEl = rootEl.querySelector(".remove-all");
        
        this.addEventListeners();
    }

    /**
     * Adds initial event listeners
     * @returns {undefined}
     */
    addEventListeners() {
        // Change me!
        this.removeAllEl.addEventListener("click",this.removeAll());
        this.cartEl.addEventListener("click",this.removeItem());
    }

    /**
     * Adds new item to the cart
     * or increments its quantity if item is already present.
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addItem(item) {
        if (!this.isItemInCart(item.id)) {
            this.addNewItem(item);
        } else {
            this.incrementItem(item);
        }

        this.updateCartState();
    }

    /**
     * Renders new item in the cart
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addNewItem(item) {
        this.cartEl.innerHTML += renderCartItem(item);
    }

    /**
     * Increments quantity and total price for existing cart item
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    incrementItem(item) {
        // Change me!
        for (const elem of this.cartEl.children) {
            if (elem.dataset.itemId === item.id) {
                // зміна кількості в атрибуті
                elem.dataset.itemQty++;
                // зміна суми за один вид товару кількості в атрибуті
                // elem.dataset.itemTotal = elem.dataset.itemPrice * elem.dataset.itemQty;
                // доступ до кількості
              //  elem.children[1].children[0].children[0].innerText = elem.dataset.itemQty;
                // 
                // оновлення даних про кількість і загальну ціну 
                this.updateItem(elem);
                
            }
        }
    }

    updateItem(item) {
        for (const elem of this.cartEl.children) {
            if (elem.dataset.itemId === item.dataset.itemId) {
                // загальна сума за цей товар (кількість товару * ціна за шт)
                elem.dataset.itemTotal = item.dataset.itemPrice * item.dataset.itemQty;
                elem.children[1].children[0].children[0].innerText = item.dataset.itemQty;
                break;
            }
        }
    }

    /**
     * Checks existence of item in shopping cart by its id
     * @param {string} id - ID of an item
     * @returns {boolean} - true if item is present in shopping cart, false otherwise
     */
    isItemInCart(id) {
        // Change me!
        for(const elem of this.cartEl.children) {
            if (id === elem.dataset.itemId) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if shopping cart is empty
     * @returns {boolean} true if there's no items in cart, false otherwise
     */
    isCartEmpty() {
        // Change me!
       // console.dir(this.cartEl);
        if (this.cartEl.children.length) {
            return false;
        }
        return true;
    }

    /**
     * Removes all items from the cart
     * @returns {undefined}
     */
    removeAll() {
        // Change me!
        let that = this;
        return function() { 
            // доки не нульова довжина
            while (that.cartEl.children.length) {
                // видаляєм першого нащадка
                that.cartEl.removeChild(that.cartEl.children[0]);
            }
            that.updateCartState();
        };
    }

    /**
     * Removes item from a list
     * @param {string} id - ID of and item to remove
     * @returns {undefined}
     */
    removeItem() {
        // Change me!
        let that = this;
        return (item) => {
            // йдем по корзині
            for (let elem of that.cartEl.children) {
                // якшо id по якому клікнули і поточний id співпадають
                if (elem.dataset.itemId === item.target.dataset.itemId) {
                    // зменшуємо кілк
                    elem.dataset.itemQty--;
                    // якшо === 0 видаляєм
                    if (elem.dataset.itemQty <= 0) {
                        that.cartEl.removeChild(elem);
                    } else {
                        // оновлюєм кільк товару
                        that.updateItem(elem);
                    }
                    that.updateCartState();
                    // break;
                }
            }
        };
    }

    /**
     * Updates total sum and visibility of "no items" message / "remove all" button
     * @returns {undefined}
     */
    updateCartState() {
        this.updateTotal();
        this.updateNoItemsMessage();
        this.updateRemoveAllButton();
    }

    /**
     * Update total sum in cart
     * @returns {undefined}
     */
    updateTotal() {
        this.totalEl.innerText = this.getTotalSum();
    }

    /**
     * Get total sum of all items in list
     * @returns {number} Total sum
     */
    getTotalSum() {
        // Change me!
        let sum = 0;
        for (const elem of this.cartEl.children) {
            sum += +elem.dataset.itemTotal;
        }
        return sum;
    }

    /**
     * Updates visibility of cart "no items" message depending on state of the cart
     * @returns {undefined}
     */
    updateNoItemsMessage() {
        if (this.isCartEmpty()) {
            // Change me!
            this.emptyCartEl.classList.remove("d-none");
        } else {
            // Change me!
            this.emptyCartEl.classList.add("d-none");
        }
    }

    /**
     * Updates visibility of cart /"remove all" button depending on state of the cart
     * @returns {undefined}
     */
    updateRemoveAllButton() {
        // Change me!
        if (this.isCartEmpty()) {
            this.removeAllEl.classList.add("d-none");
        } else {
            this.removeAllEl.classList.remove("d-none");
        }
    }
}
