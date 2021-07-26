const liveOrderBoard = require('../src/liveOrderBoard.js');
const expect = require('chai').expect;
const assert = require('assert');

describe("Placing and cancelling orders", function() {
    let firstOrder;
    before(function() {
        let orderType= 'BUY';
        let userId = 'user1';
        let coinType = 'Ethereum';
        let orderQuantity = 5;
        let pricePerCoin = 125;
        firstOrder = liveOrderBoard.placeOrder(orderType, userId, coinType, orderQuantity, pricePerCoin);
      });

      describe("Live Order Board", function() {
        liveOrderBoard.placeOrder('SELL', 'user1', 'Ethereum', 5, 125);
        liveOrderBoard.placeOrder('SELL', 'user2', 'Ethereum', 3, 5);
        liveOrderBoard.placeOrder('SELL', 'user2', 'Ethereum', 3, 125);
        liveOrderBoard.placeOrder('BUY', 'user2', 'Ethereum', 3, 125);
        liveOrderBoard.placeOrder('SELL', 'user2', 'Ethereum', 2, 125);
        liveOrderBoard.placeOrder('SELL', 'user2', 'Ethereum', 2, 50);
        liveOrderBoard.placeOrder('SELL', 'user2', 'Ethereum', 2, 50);
        liveOrderBoard.placeOrder('BUY', 'user1', 'Ethereum', 2, 125);
        liveOrderBoard.placeOrder('BUY', 'user3', 'Ethereum', 2, 50);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 50);
        liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 3000);
        liveOrderBoard.placeOrder('SELL', 'user9', 'Ethereum', 2, 3050);
        liveOrderBoard.placeOrder('SELL', 'user10', 'Ethereum', 2, 4000);
        liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 500);
        liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 900);
        liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 1111);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5000);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5001);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5002);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5003);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5004);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5005);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5006);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5007);
        liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5008);
      
        const result = liveOrderBoard.liveOrderDisplay();
        it("merges orders with the same price together", function() {
          expect(result).to.eql(
            {
              resultSell: [
                { totalPrice: 5, pricePerCoin: 5 },
                { totalPrice: 100, pricePerCoin: 50 },
                { totalPrice: 375, pricePerCoin: 125 },
                { totalPrice: 500, pricePerCoin: 500 },
                { totalPrice: 900, pricePerCoin: 900 },
                { totalPrice: 1111, pricePerCoin: 1111 },
                { totalPrice: 3000, pricePerCoin: 3000 },
                { totalPrice: 3050, pricePerCoin: 3050 },
                { totalPrice: 4000, pricePerCoin: 4000 }
              ],
              resultBuy: [
                { totalPrice: 5008, pricePerCoin: 5008 },
                { totalPrice: 5007, pricePerCoin: 5007 },
                { totalPrice: 5006, pricePerCoin: 5006 },
                { totalPrice: 5005, pricePerCoin: 5005 },
                { totalPrice: 5004, pricePerCoin: 5004 },
                { totalPrice: 5003, pricePerCoin: 5003 },
                { totalPrice: 5002, pricePerCoin: 5002 },
                { totalPrice: 5001, pricePerCoin: 5001 },
                { totalPrice: 5000, pricePerCoin: 5000 },
                { totalPrice: 250, pricePerCoin: 125 }
              ]
            }
          );
        });
        it("shows SELL orders sorted as lowest prices displayed first", function() {
          expect(result.resultSell[0].totalPrice).to.eql(5);
          expect(result.resultSell[1].totalPrice).to.eql(100);
          expect(result.resultSell[2].totalPrice).to.eql(375);
          expect(result.resultSell[3].totalPrice).to.eql(500);
        });
        it("shows BUY orders sorted as highest prices displayed first", function() {
          expect(result.resultBuy[0].totalPrice).to.eql(5008);
          expect(result.resultBuy[1].totalPrice).to.eql(5007);
        });
        it("shows up to 10 SELL orders", function() {
          expect(result.resultSell).to.eql(
            [
                { totalPrice: 5, pricePerCoin: 5 },
                { totalPrice: 100, pricePerCoin: 50 },
                { totalPrice: 375, pricePerCoin: 125 },
                { totalPrice: 500, pricePerCoin: 500 },
                { totalPrice: 900, pricePerCoin: 900 },
                { totalPrice: 1111, pricePerCoin: 1111 },
                { totalPrice: 3000, pricePerCoin: 3000 },
                { totalPrice: 3050, pricePerCoin: 3050 },
                { totalPrice: 4000, pricePerCoin: 4000 }
              ]
          );
        });
        it("shows up to 10 BUY orders", function() {
          expect(result.resultBuy).to.eql(
            [
              { totalPrice: 5008, pricePerCoin: 5008 },
              { totalPrice: 5007, pricePerCoin: 5007 },
              { totalPrice: 5006, pricePerCoin: 5006 },
              { totalPrice: 5005, pricePerCoin: 5005 },
              { totalPrice: 5004, pricePerCoin: 5004 },
              { totalPrice: 5003, pricePerCoin: 5003 },
              { totalPrice: 5002, pricePerCoin: 5002 },
              { totalPrice: 5001, pricePerCoin: 5001 },
              { totalPrice: 5000, pricePerCoin: 5000 },
              { totalPrice: 250, pricePerCoin: 125 }
            ]
          );
        });
      });

      describe("Cancel the order", function() {
        it("remove the order from the object", function() {    
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 5, 125);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 3, 5);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 3, 125);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user2', 'Ethereum', 3, 125);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 2, 125);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 2, 50);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user2', 'Ethereum', 2, 50);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user1', 'Ethereum', 2, 125);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user3', 'Ethereum', 2, 50);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 50);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user8', 'Ethereum', 2, 3);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user8', 'Ethereum', 2, 3000);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user9', 'Ethereum', 2, 3050);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user10', 'Ethereum', 2, 4000);
            liveOrderBoard.cancelRegisteredOrder('SELL', 'user8', 'Ethereum', 2, 300);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 5000);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 5001);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 5002);
            liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 5003);
            const cancelOrder = liveOrderBoard.cancelRegisteredOrder('BUY', 'user4', 'Ethereum', 2, 5004);

            console.log('cancelOrder', cancelOrder);
    
            expect(cancelOrder).to.eql(
                [
                  {
                    orderType: 'BUY',
                    userId: 'user4',
                    coinType: 'Ethereum',
                    orderQuantity: 2,
                    pricePerCoin: 5004
                  },
                  {
                    orderType: 'BUY',
                    userId: 'user4',
                    coinType: 'Ethereum',
                    orderQuantity: 2,
                    pricePerCoin: 5005
                  },
                  {
                    orderType: 'BUY',
                    userId: 'user4',
                    coinType: 'Ethereum',
                    orderQuantity: 2,
                    pricePerCoin: 5006
                  },
                  {
                    orderType: 'BUY',
                    userId: 'user4',
                    coinType: 'Ethereum',
                    orderQuantity: 2,
                    pricePerCoin: 5007
                  },
                  {
                    orderType: 'BUY',
                    userId: 'user4',
                    coinType: 'Ethereum',
                    orderQuantity: 2,
                    pricePerCoin: 5008
                  },
                  {
                    orderType: 'BUY',
                    userId: 'user1',
                    coinType: 'Ethereum',
                    orderQuantity: 5,
                    pricePerCoin: 125
                  }
                ]);
        });
    });

    describe("placing an order", function () {
        it("places an order", function () {
          const order = liveOrderBoard.placeOrder('SELL', 'user1', 'Ethereum', 5, 44);
          expect(order).to.eql([
            {
              orderType: 'BUY',
              userId: 'user4',
              coinType: 'Ethereum',
              orderQuantity: 2,
              pricePerCoin: 5004
            },
            {
              orderType: 'BUY',
              userId: 'user4',
              coinType: 'Ethereum',
              orderQuantity: 2,
              pricePerCoin: 5005
            },
            {
              orderType: 'BUY',
              userId: 'user4',
              coinType: 'Ethereum',
              orderQuantity: 2,
              pricePerCoin: 5006
            },
            {
              orderType: 'BUY',
              userId: 'user4',
              coinType: 'Ethereum',
              orderQuantity: 2,
              pricePerCoin: 5007
            },
            {
              orderType: 'BUY',
              userId: 'user4',
              coinType: 'Ethereum',
              orderQuantity: 2,
              pricePerCoin: 5008
            },
            {
              orderType: 'BUY',
              userId: 'user1',
              coinType: 'Ethereum',
              orderQuantity: 5,
              pricePerCoin: 125
            },
            {
              orderType: 'SELL',
              userId: 'user1',
              coinType: 'Ethereum',
              orderQuantity: 5,
              pricePerCoin: 44
            }
          ]);
        })
    });
});