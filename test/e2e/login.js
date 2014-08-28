'use strict';

describe('SECS', function() {
  beforeEach(function() {
    // See e2e/home.js
    browser.ignoreSynchronization = true;
  });

  it('should redirect to the login page', function() {
    browser.get('/');
    var expected = browser.baseUrl + '/#/login?back=%2F';
    expect(browser.getCurrentUrl()).toEqual(expected);
  });

  describe('login page', function() {
    var form;
    beforeEach(function() {
      browser.get('/#/login');
      form = element(by.tagName('form'));
    });

    it('should disable submit if username/password are missing', function() {
      var submitButton = form.element(by.tagName('button'));
      expect(submitButton.isEnabled()).toBe(false);
    });

    describe('username field', function() {
      var username;
      var helpBlocks;
      beforeEach(function() {
        username = form.element(by.id('username'));
        helpBlocks = username.all(by.css('.help-block'));
      });

      xit('should only show help if user has typed', function() {
        expect(helpBlocks.count()).toBe(0);
      });

      xit('should be required', function() {
        var input = username.element(by.tagName('input'));
        input.sendKeys('test');
        input.clear();
        expect(helpBlocks.count()).toBe(1);
      });
    });

    describe('form-level errors', function() {
      var formErrors;
      beforeEach(function() {
        formErrors = form.element(by.id('form-errors'));
      });

      it('should not not be displayed on page load', function() {
        expect(formErrors.isPresent()).toBe(false);
      });
    });
  });
});
