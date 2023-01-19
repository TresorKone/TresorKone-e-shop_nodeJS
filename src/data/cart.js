module.exports = function Cart(initItems) {
    this.items =  initItems.items || {};
    this.totalQty = initItems.totalQty || 0;
    this.totalPrice = initItems.totalPrice || 0;

    this.add = function(item, id) {
        let addedItem = this.items[id];
        if (!addedItem) {
            addedItem = this.items[id] =
                {
                    item: item,
                    qty: 0,
                    price: 0
                };
        }

        addedItem.qty++;
        addedItem.price = addedItem.item.price * addedItem.qty;
        this.totalQty++;
        this.totalPrice += addedItem.item.price;
    }

    this.generatedArray = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};