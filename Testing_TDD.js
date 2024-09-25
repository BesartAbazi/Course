// index.html
/*
<section id="messages">
</section>

<label for="author">Title</label>
<input id="author">

<label for="message">Your poem:</label>
<textarea id="message"></textarea>

<input type="submit">
*/



// test code
const { assert } = require('chai');

describe('User visits root', () => {

    describe('without existing messages', () => {
        it('starts blank', () => {
            browser.url('/');
            assert.equal(browser.getText('#messages'), '');
        });
    });

    describe('posting a message', () => {
        it('saves the message with the author information', () => {
            // Setup
            const author = 'user name';
            const message = 'feature testing with TDD makes me feel empowered to create a better workflow';

            // Exercise
            browser.url('/');
            browser.setValue('input[id=author]', author);
            browser.setValue('textarea[id=message]', message);
            browser.click('input[type=submit]');

            // Verify
            assert.include(browser.getText('#messages'), message);
            assert.include(browser.getText('#messages'), author);

        });
    });
});