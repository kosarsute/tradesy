"use strict";

class Homepage {
    get $$siteMenuLabel() { return $$("[class='top-level']"); }  
    get $cartIcon() { return $('[aria-label="Cart"]'); }

    // Helper method to navigate to submenu by textlabel
    NavigateToSubmenuByText(menulabel) {
        const siteMenu = {};
        browser.waitUntil(() => {
            return this.$$siteMenuLabel.map((elem) => elem.isDisplayed()).length > 4;
        }, { timeout: 10000, timeoutMsg: 'Not all elements were visible' });
        this.$$siteMenuLabel.forEach(element => {
            siteMenu[element.getText()] = element;
        });
    //    console.log(Object.keys(siteMenu))
        siteMenu[menulabel].click();
    }
}
module.exports = new Homepage();