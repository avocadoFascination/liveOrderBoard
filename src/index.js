const liveOrderBoard = require('./liveOrderBoard');


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
liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 3);

liveOrderBoard.cancelRegisteredOrder('SELL', 'user8', 'Ethereum', 2, 3);

liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 3000);
liveOrderBoard.placeOrder('SELL', 'user9', 'Ethereum', 2, 3050);
liveOrderBoard.placeOrder('SELL', 'user10', 'Ethereum', 2, 4000);
liveOrderBoard.placeOrder('SELL', 'user8', 'Ethereum', 2, 300);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5000);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5001);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5002);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5003);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5004);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5005);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5006);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5007);
liveOrderBoard.placeOrder('BUY', 'user4', 'Ethereum', 2, 5008);

liveOrderBoard.liveOrderDisplay();

module.exports = {
    placeOrder: liveOrderBoard.placeOrder(),
    cancelRegisteredOrder: liveOrderBoard.cancelRegisteredOrder,
    liveOrderDisplay: liveOrderBoard.liveOrderDisplay
}