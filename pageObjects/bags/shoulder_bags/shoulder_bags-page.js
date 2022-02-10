"use strict";

class Shoulder_bags {
  get $addToBagButton() { return $("[data-testid='idp-cta']"); }
  get $$shoulderBagsItems() { return $$("[data-testid='item-tile-title']"); }
  get $$shoulderBagsItemWhole() {return $$('[data-testid="item-tile"]') ;}
  get $$shoulderBagsItemTitle() { return $$("[data-testid='item-tile-title']"); }
  get $shoulderBagsItemTitleInProduct() {return $('[class="overview"] [itemprop="name"]'); }
  get $navigateBackToShoulderBagsPageSubMenu() { return $("span=Shoulder Bags"); }
  get $totalAmountPrice() { return $('[data-testid="total-amount"]'); }

  getOneItem() {
    // Object of suitable items with a property name as an Item title and it's value as an Item price
    let cart = {};
    // Loop through an array of Best Sellers items
    for (let i = 0; i < 1; i++) {
      this.$$shoulderBagsItemWhole[i].click()
      this.$navigateBackToShoulderBagsPageSubMenu.waitForDisplayed();
      let itemName = this.$shoulderBagsItemTitleInProduct.getText().replace("\n", " ");
      let itemPrice = parseFloat($('[class="item-price-label"]').getText().replace("$","").replace("Price: ",""))
      cart[itemName] = itemPrice;
      console.log(cart)
      this.$addToBagButton.click();
      this.$navigateBackToShoulderBagsPageSubMenu.waitForDisplayed();
    };

    return cart;
  }

  getFirstTwoItems() {
    // Object of suitable items with a property name as an Item title and it's value as an Item price
    let cart = {};
    // Loop through an array of shoulders bag items
    for (let i = 0; i < 2; i++) {
      let itemName = this.$$shoulderBagsItemWhole[i].$('[data-testid="item-tile-title"]').getText();
      let itemPrice = parseFloat($$('[data-testid="item-tile"]')[i].$('[data-testid="item-tile-display-price"]').getText().replace("$", "").replace(",", ""));
      cart[itemName] = itemPrice;
      $$('[data-testid="item-tile"]')[i].click()
      $("span=Shoulder Bags").waitForDisplayed();
      $('[data-testid="idp-cta"]').click();
      $("span=Shoulder Bags").waitForDisplayed();
      $("span=Shoulder Bags").click();
      browser.waitUntil(() => {
        return $$('[data-testid="item-tile"]').map((elem) => elem.isDisplayed()).length > 4;
      }, { timeout: 10000, timeoutMsg: 'Not all elements were visible' });
    };
    return cart;
  }
  
}
module.exports = new Shoulder_bags();






