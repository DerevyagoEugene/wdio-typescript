Feature: Onliner

  @Variant_1
  Scenario: Get a list of product prices
    Given I have navigated to the home page
      And I have navigated to a random product category
    When  I store first product's data
      And I search for a stored product
      And I click the amount of suggestions button
    Then  Offers page is opened
      And All offered prices are bigger than default
