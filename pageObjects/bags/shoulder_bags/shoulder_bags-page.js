"use strict";

class Shoulder_bags {
  get $addToBagButton() { return $("[data-testid='idp-cta']"); }
  get $$shoulderBagsItems() { return $$("[data-testid='item-tile-title']"); }
  get $$shoulderBagsItemWhole() {return $$('[data-testid="item-tile"]') ;}
  get $$shoulderBagsItemTitle() { return $$("[data-testid='item-tile-title']"); }
  get $shoulderBagsItemTitleInProduct() {return $('[class="overview"] [itemprop="name"]'); }
  get $shoulderBagsItemPriceInProduct() { return $('[data-testid="item-price-label"]'); }
  get $navigateBackToShoulderBagsPageSubMenu() { return $("span=Shoulder Bags"); }
  get $totalAmountPrice() { return $('[data-testid="total-amount"]'); }

  getFirstTwoItems() {
    // Object of suitable items with a property name as an Item title and it's value as an Item price
    let cart = {};
    // Loop through an array of shoulders bag items
    for (let i = 0; i < 2; i++) {
      this.$$shoulderBagsItemWhole[i].click()
      this.$navigateBackToShoulderBagsPageSubMenu.waitForDisplayed();
      let itemName = this.$shoulderBagsItemTitleInProduct.getText().replace("\n", " ");
      let itemPrice = parseFloat(this.$shoulderBagsItemPriceInProduct.getText().replace("$", "").replace(",", "").replace("Price: ",""));
      cart[itemName] = itemPrice;
      this.$addToBagButton.click();
      this.$navigateBackToShoulderBagsPageSubMenu.waitForDisplayed();
      this.$navigateBackToShoulderBagsPageSubMenu.click();
      browser.waitUntil(() => {
        return this.$$shoulderBagsItemWhole.map((elem) => elem.isDisplayed()).length > 4;
      }, { timeout: 10000, timeoutMsg: 'Not all elements were visible' });
    };
    console.log(cart)
    return cart;
  }
}
module.exports = new Shoulder_bags();






