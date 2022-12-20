import { Given, When, Then } from '@wdio/cucumber-framework';
import { browserUtils } from "../../framework/utils";
import * as testData from '../../config/testData.json'
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import { assert } from 'chai';
import CategoryInfoForm from "../pages/CategoryInfoForm";
import ProductPage from "../pages/ProductPage";
import OffersPage from "../pages/OffersPage";

Given(/^I have navigated to the home page$/, async () => {
    return await browserUtils.openUrl(testData.url);
});

Given(/^I have navigated to a random product category$/, async () => {
    const categoryName = await HomePage.selectRandomCategory();
    await CategoryPage.isOpen();
    assert.isTrue(
        await CategoryPage.isRightCategoryOpened(categoryName),
        `Category '${categoryName}' should be opened`
    );
});

When(/^I store first product's data$/, async function () {
    this.data = await CategoryInfoForm.getFirstProductData();
});

When(/^I search for a stored product$/, async function () {
    await HomePage.searchProduct(this.data.name);
});

When(/^I click the amount of suggestions button$/, async () => {
    await ProductPage.clickOffers()
});

Then(/^Offers page is opened$/, async () => {
    assert.isTrue(
        await OffersPage.isOpen(),
        `${OffersPage.getName()}' should be opened`
    );
});

Then(/^All offered prices are bigger than default$/, async function () {
    const prices = await OffersPage.getAllOfferedPrices();
    assert.isTrue(
        !prices.some(it => it > this.data.minPrice),
        `All offered prices should be bigger than default`
    );
});
