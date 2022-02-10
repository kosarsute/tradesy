const Homepage = require("../../pageObjects/homepage/homepage-page")
const Bags = require("../../pageObjects/bags/bags-page")
const Shoulders_bags = require("../../pageObjects/bags/shoulder_bags/shoulder_bags-page")
const ShoppingBag = require("../../pageObjects/shopping_bag/shopping_bag-page")
const Login = require("../../pageObjects/login/login-page")
const Credentials = require("../../data/credentials.json")

const { expect } = require("chai");

const email = Credentials.admin.login.email;
const password = Credentials.admin.login.password;

describe("Challenge", () => {
    it("User should be able to add 2 items to the bag, verify total price of items is correct, safe item for later, remove all items from the bag and verify", () => {
        // Open "Tradesy.com" test environment
        browser.url("./");
        // Navigate to Bags section
        Homepage.NavigateToSubmenuByText('Bags')
        // Filter bags by 'Shoulder Bags'
        Bags.CategorizeBagsByFilterOption('Shoulder Bags')
        // Add items to the shopping cart
        // also i would test it more because of reserved items and time
        browser.waitUntil(() => {
            return Shoulders_bags.$$shoulderBagsItems.map((elem) => elem.isDisplayed()).length > 4;
        }, { timeout: 10000, timeoutMsg: 'Not all elements were visible' });
        const ShopingCartItems = Shoulders_bags.getFirstTwoItems()
        // Navigate to the shoping cart
        Homepage.$cartIcon.click()
        ShoppingBag.$checkoutBtn.waitForDisplayed()
        // I would validate that bags i added the same in shoping bag and have the same price... i just figured that i have to collect data from product page because name of the product cuting in a shoulders bag page and it goes without Brand name which affects valitation
       // I would also create option if bag was already reserved to go over second bag and so on
      // Validate items count same as amount you added
       expect(Object.keys(ShopingCartItems).length).to.equal(
            $$('[class="cart-item row"]').length
          );
         // $$('[class="cart-item row"]').every((i) => {
         ///expect(ShopingCartItems).to.contain(i.$("//*[@class='cart-item-name-seller columns']/a").getText());
        //     expect(ShopingCartItems[i.$("//*[@class='cart-item-name-seller columns']/a").getText()]).to.equal(
        //       parseFloat(i.$(".item-price").getText().replace("$", "").replace(",",""))
        //     );
        //   })
        // Check the total price of cart items is correct
        expect(
            parseFloat(
                Shoulders_bags.$totalAmountPrice.getText().replace("$", "").replace(",", "")
            )
        ).to.equal(ShoppingBag.getShoppingBagTotalWithoutTax());
        // Safe item for later and verify
        ShoppingBag.$$safeForLaterBtn[0].click()
        Login.$logInBtn.click()
        Login.login({ email: email, password: password });
        ShoppingBag.$savedItemsCount.waitForDisplayed()
        expect(parseFloat(ShoppingBag.$savedItemsCount.getText())).to.equal(1)
        // Remove all items from the shopping cart
        ShoppingBag.clearShoppingCart()
        // Verify that shopping cart is empty
        expect(ShoppingBag.$shoppingCartEmptyLbl.getText()).to.equal("Your shopping bag is empty, but let's change that. Start shopping now.");
    })
})
