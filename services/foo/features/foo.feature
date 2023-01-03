Feature: Is foo bar?

  Scenario: Shared foo bar ting
    Then allocation bar should be set
    And allocation foo should be true
    And allocation method should do something
    And I should be able to see allocation from here too

  Scenario: Using auth context
    Given there is a member called "John Doe"
    Then member "John Doe" should have an email
