/* global module */
module.exports = {
  'Demo test Uncle!': function(browser) {

    browser
    // will use css selectors until otherwise specified
      .useCss()
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 10000)
      .getTitle(function(title) {
        this.assert.equal(typeof title, 'string');
        this.assert.equal(title, 'Uncle!');
      })
      // click the increase button
      .waitForElementVisible('.btn-default', 3000);

    // confirm that the logo and navigation links are visible
    browser.expect.element('.fa-home').to.be.visible;
    browser.expect.element('.nav-link').to.be.visible;

    browser.expect.element('.currentCount').text.to.contain('0');
    browser.click('.btn-default');
    browser.expect.element('.currentCount').text.to.contain('1');

    // confirm that the alternate screen will come up
    browser
      .useCss()
      .url('http://localhost:8080/#/alternate');

    // confirm that the alternate screen represents the same state
    browser.expect.element('.currentCount').text.to.contain('1');

    // close browser and log friendly message
    browser.end(() => console.log('That\'s all she wrote. NightWatch tests OK!'));
  }
};
