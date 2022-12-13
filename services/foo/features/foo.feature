Feature: Is foo bar?

  Scenario: Shared foo bar ting
    When I set foo to bar
    Then I expect foo to be bar
    Then I expect foo to be bar in my local scope too
