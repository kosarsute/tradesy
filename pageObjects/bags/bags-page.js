"use strict";

class Bags {
    get $$filterOptionCheckbox() { return $$("[data-testid='filter-option']"); }  

    // Helper method to add an item to cart from Shoulder Bags by price
    CategorizeBagsByFilterOption(filterOption) {
        const filter = {};
        browser.waitUntil(() => {
            return this.$$filterOptionCheckbox.map((elem) => elem.isDisplayed()).length > 10;
        }, { timeout: 10000, timeoutMsg: 'Not all elements were visible' });
        this.$$filterOptionCheckbox.forEach(element => {
            filter[element.getText()] = element;
        });
        //console.log(Object.keys(filter))
        filter[filterOption].click();
    }
}
module.exports = new Bags();