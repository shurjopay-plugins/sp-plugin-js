//test by mocha
// Requiring module
import assert from 'assert';
// import setting from '../setting.js'

// import {authentication,makePayment,verifyPayment,paymentStatus} from '../Shurjopay.js'
 import { makePayment } from '../Shurjopay.js';

// We can group similar tests inside a 'describe' block
describe("authentication,makePayment,verifyPayment,paymentStatus", () => {
    before(() => {
        //console.log("This part executes once before all tests");
    });

    after(() => {
        //console.log("This part executes once after all tests");
    });

    // We can add nested blocks for different tests
    describe("makePayment", () => {
        beforeEach(() => {
            console.log("Test checkout");
        });

        it("Is checkout working properly", () => {
            makePayment({
                amount: '10',
                order_id: 'sp315689',
                customer_name: 'ATM Fahim',
                customer_address: 'Dhaka',
                customer_phone: '01534303074',
                customer_city: 'Dhaka',
                customer_post_code: '1212',
                client_ip: '102.101.1.1'
            }, function (resp_data) {
                //assert('checkout_url2' in resp_data);
                //assert('sp_order_id' in resp_data);
                //assert('transactionStatus' in resp_data);
                assert.equal(resp_data.transactionStatus, 'Initiated');
            });
        });
    });

    /*
    describe("verifyPayment", () => {
        beforeEach(() => {
            console.log("executes before every test");
        });
        it("Is returning 4 when adding 2 + 3", () => {
            assert.equal(2 + 3, 4);
        });
        it("Is returning 8 when multiplying 2 * 4", () => {
            assert.equal(2 * 4, 8);
        });
    });
    describe("paymentStatus", () => {
        beforeEach(() => {
            console.log("executes before every test");
        });
        it("Is returning 4 when adding 2 + 3", () => {
            assert.equal(2 + 3, 4);
        });
        it("Is returning 8 when multiplying 2 * 4", () => {
            assert.equal(2 * 4, 8);
        });
    });
    */
});