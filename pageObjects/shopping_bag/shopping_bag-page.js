"use strict";

class ShoppingBag {
    get $$shoppingCartRemoveButton() { return $$(".cart-remove"); }
    get $shoppingCartEmptyLbl() { return $("p=Your shopping bag is empty, but let's change that. Start shopping now."); }
    get $$shoppingBagTotalRow() { return $$("[class='small-9 medium-10 columns item-price']"); }
    get $addToBagBtn() { return $('[data-testid="idp-cta"]'); }
    get $viewShoppingBagBtn() { return $('.view-bag-button'); }
    get $totalNumberOfItems() { return $('.heading.tdc-bold'); }
    get $checkoutBtn() { return $(".checkout-btn"); }
    get $$safeForLaterBtn() { return $$('.cart-save-for-later'); }
    get $savedItemsCount() { return $('[id="saved_items_count"]'); }
    get $$itemRowInBag() { return $$('[class="cart-item row"]'); }

    // Method to calculate total price for the items in the Cart without tax costs
    getShoppingBagTotalWithoutTax() {
        let sum = 0;
        for (let i = 0; i < this.$$shoppingBagTotalRow.length; i++) {
            sum += parseFloat(this.$$shoppingBagTotalRow[i].getText().replace("$", "").replace(",", ""));
        }
        return sum;
    }
    // Method to delete each item from the Cart
    clearShoppingCart() {
        this.$$shoppingCartRemoveButton.forEach((element) => {
            element.click()
            browser.pause(2000);
        });
    }
}
module.exports = new ShoppingBag();