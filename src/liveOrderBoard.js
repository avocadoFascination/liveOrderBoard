let allOrders = [];
let order = {}; 
let orderId = 0;

const placeOrder = (_orderType, _userId, _coinType, _orderQuantity, _pricePerCoin) => {
    order = {
        orderType: _orderType,
        userId: _userId,
        coinType: _coinType,
        orderQuantity: _orderQuantity,
        pricePerCoin: _pricePerCoin
    };
    allOrders.push(order);
    return allOrders;
};

const cancelRegisteredOrder = (_orderType, _userId, _coinType, _orderQuantity, _pricePerCoin) => {
    let removeIndex;

    try {
        for (let i = 0; i < allOrders.length; i++ ) {
            allOrders.map((el) => (el.orderType, el.userId, el.coinType, el.orderQuantity, el.pricePerCoin)).indexOf(i); 
        }
    } catch (err) {
        console.log(err);
    }

    // remove object
    allOrders.splice(removeIndex, 1);

    return allOrders;
};

const liveOrderDisplay = () => {
    let map = {};
    const obj = {};
    let finalSellObj = {};
    let finalBuyObj = {};
    let sellOrder = [];
    let buyOrder = [];
    let arraySell = [];
    let arrayBuy = [];
    let finalSellArr = [];
    let finalBuyArr = [];
    let finalSellItems = [];
    let finalBuyItems = [];
    let totalPriceSell = 0;
    let totalPriceBuy = 0;

    allOrders.forEach(order => {
        if (order.orderType === 'SELL') {
            sellOrder.push(order);
        } else if (order.orderType === 'BUY') {
            buyOrder.push(order);
        }
    });
    
    sellOrder.sort((a, b) => a.pricePerCoin > b.pricePerCoin && 1 || -1);
    buyOrder.sort((a, b) => a.pricePerCoin < b.pricePerCoin && 1 || -1);

    for (let i = 0; i < sellOrder.length; i++ ) {
         //push all the prices in array
         arraySell.push(sellOrder[i].pricePerCoin);

        //filter per index and create an array with the individual prices
        uniqueArray = arraySell.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })

        for (let j = 0; j < uniqueArray.length; j++) {
            // for each matching pricePerCoin add them up
            let sumItUp = [];
            const firstIndex = sellOrder.findIndex(el => el.pricePerCoin === uniqueArray[j]);
            const lastIndex = sellOrder.map(el => el.pricePerCoin).lastIndexOf(uniqueArray[j]); 

            if (firstIndex !== lastIndex) {
                sumItUp = sellOrder.slice(firstIndex, lastIndex + 1);
                totalPriceSell = sumItUp.reduce(function(prev, cur) {
                    return prev + cur.pricePerCoin;
                }, 0);
                
            } else {
                totalPriceSell = uniqueArray[j];
            }

            finalSellObj = {
                totalPrice: totalPriceSell,
                pricePerCoin: uniqueArray[j],
            };
        }

        finalSellArr.push(finalSellObj);
    }

    for (let i = 0; i < buyOrder.length; i++ ) {
        //push all the prices in array
        arrayBuy.push(buyOrder[i].pricePerCoin);

       //filter per index and create an array with the individual prices
       uniqueArray = arrayBuy.filter(function(item, pos, self) {
           return self.indexOf(item) == pos;
       })

       for (let j = 0; j < uniqueArray.length; j++) {
           // for each matching pricePerCoin add them up
           let sumItUp = [];
           const firstIndex = buyOrder.findIndex(el => el.pricePerCoin === uniqueArray[j]);
           const lastIndex = buyOrder.map(el => el.pricePerCoin).lastIndexOf(uniqueArray[j]); 

           if (firstIndex !== lastIndex) {
               sumItUp = buyOrder.slice(firstIndex, lastIndex + 1);
               totalPriceBuy = sumItUp.reduce(function(prev, cur) {
                   return prev + cur.pricePerCoin;
               }, 0);
           } else {
            totalPriceBuy = uniqueArray[j];
           }  

           finalBuyObj = {
               totalPrice: totalPriceBuy,
               pricePerCoin: uniqueArray[j],
           };
       }

       finalBuyArr.push(finalBuyObj);
   }

    //remove duplicates
    const sell = new Set();
    const buy = new Set();

    finalSellItems = finalSellArr.filter(el => {
        const duplicate = sell.has(el.pricePerCoin);
        sell.add(el.pricePerCoin);
        return !duplicate;
      });

    finalBuyItems = finalBuyArr.filter(el => {
        const duplicate = buy.has(el.pricePerCoin);
        buy.add(el.pricePerCoin);
        return !duplicate;
      });

      //return up to 10 items sorted depending if it is 'SELL' or 'BUY'
      finalSellItems.sort((a, b) => a.totalPrice > b.totalPrice && 1 || -1);
      finalBuyItems.sort((a, b) => a.totalPrice < b.totalPrice && 1 || -1);

      console.log('SELL');
      for (let i = 0; i < 9; i ++) {
        if (finalSellItems[i]) {
            console.log(finalSellItems[i].totalPrice, 'for $', finalSellItems[i].pricePerCoin);
        }
      }
      console.log('BUY');
      for (let i = 0; i < 9; i ++) {
        if (finalBuyItems[i]) {
            console.log(finalBuyItems[i].totalPrice, 'for $', finalBuyItems[i].pricePerCoin);
        }
      }

      const resultSell = finalSellItems.slice(0, 10);
      const resultBuy = finalBuyItems.slice(0, 10);

    return { resultSell, resultBuy } ;
};

placeOrder('SELL', 'user1', 'Ethereum', 5, 125);
placeOrder('SELL', 'user2', 'Ethereum', 3, 5);
placeOrder('SELL', 'user2', 'Ethereum', 3, 125);
placeOrder('BUY', 'user2', 'Ethereum', 3, 125);
placeOrder('SELL', 'user2', 'Ethereum', 2, 125);
placeOrder('SELL', 'user2', 'Ethereum', 2, 50);
placeOrder('SELL', 'user2', 'Ethereum', 2, 50);
placeOrder('BUY', 'user1', 'Ethereum', 2, 125);
placeOrder('BUY', 'user3', 'Ethereum', 2, 50);
placeOrder('BUY', 'user4', 'Ethereum', 2, 50);
placeOrder('SELL', 'user8', 'Ethereum', 2, 3);

cancelRegisteredOrder('SELL', 'user8', 'Ethereum', 2, 3);

placeOrder('SELL', 'user8', 'Ethereum', 2, 3000);
placeOrder('SELL', 'user9', 'Ethereum', 2, 3050);
placeOrder('SELL', 'user10', 'Ethereum', 2, 4000);
placeOrder('SELL', 'user8', 'Ethereum', 2, 300);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5000);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5001);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5002);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5003);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5004);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5005);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5006);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5007);
placeOrder('BUY', 'user4', 'Ethereum', 2, 5008);

liveOrderDisplay();

module.exports = {
    LiveOrderBoard,
    placeOrder,
    cancelRegisteredOrder,
    liveOrderDisplay
}