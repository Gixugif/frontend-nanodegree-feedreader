/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('have URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

         it('have name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    describe('The menu',function () {

        it('is hidden by default', function() {
            var hidden = false;
            if($('.slide-menu').parents('.menu-hidden').length == 1) {
                hidden = true;
            }

            expect(hidden).toBe(true);
        });

        it('toggles hidden', function() {
            var isHidden = $('.slide-menu').parents('.menu-hidden').length == 1;
            // we check the current status so that the test will work no matter the default state

            $('.menu-icon-link').trigger('click');
            expect($('.slide-menu').parents('.menu-hidden').length == 1).not.toBe(isHidden);

            $('.menu-icon-link').trigger('click');
            expect($('.slide-menu').parents('.menu-hidden').length == 1).toBe(isHidden);
        });

    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        it('has at least one entry', function (done) {

            var entry = document.getElementsByClassName('entry');
            var feed = document.getElementsByClassName('feed');

            expect($('.feed').find('.entry').length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection',function() {
        var entries,
            changedEntries;

        beforeEach(function(done) {
            //grab the current entries then load new ones
            loadFeed(1,function() {
                entries = $('.feed').html();
                done();
            });
        });

         it('changes content',function(done) {

            loadFeed(0,function() {
                // then we compare the old ones to the new ones
                expect($('.feed').html()).not.toEqual(entries);
                done();
            });

         });
    });

}());
