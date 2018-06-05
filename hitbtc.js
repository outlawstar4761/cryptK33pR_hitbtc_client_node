var self = this;
self.https = require('https');
self.crypto = require('crypto');
self.queryStr = require('querystring');
self.apiBase = 'https://api.hitbtc.com/api/2/';
self.hostName = 'api.hitbtc.com';
self.publicKey = '1234';
self.privateKey = '1234';
self.port = 443;

self.httpRequest = function(method,endpoint,params,headers){
    return new Promise(function(resolve, reject){
        var options = {
            hostname:self.hostName,
            port:self.port,
            path:'/' + endpoint,
            method:method,
        };
        options.headers = headers;
        var req = self.https.request(options,function(response){
            var data = '';
            response.on('data',function(chunk){
                data += chunk;
            });
            response.on('end',function(){
                resolve(JSON.parse(data));
            });
        }).on('error',function(err){
            reject(err.message);
        });
        req.write(JSON.stringify(params));
    });
};
self.buildAuthHeader = function(){
    var auth = "Basic " + new Buffer(self.publicKey + ":" + self.privateKey).toString("base64");
    return {"Authorization":auth};
}
self.getCurrency = function(currency){
    var url = 'api/2/public/currency/';
    if(currency !== undefined){
        url += currency;
    }
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getSymbol = function(symbol){
    var url = 'api/2/public/symbol/';
    if(symbol !== undefined){
        url += symbol;
    }
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTicker = function(symbol){
    var url = 'api/2/public/ticker/';
    if(symbol !== undefined){
        url += symbol;
    }
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTrades = function(symbol){
    var url = self.apiBase + 'api/2/public/trades/' + symbol;
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getOrderBook = function(symbol){
    var url = 'api/2/public/orderbook/' + symbol;
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
//Candles are used to build Open-high-low-close chart
self.getCandles = function(symbol){
    var url = 'api/2/public/candles/' + symbol;
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,null).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
/*PRIVAE METHODS*/
self.getTradingBalance = function(){
    var url = 'api/2/trading/balance';
    return new Promise(function(resolve,reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getAccountBalance = function(){
    var url = 'api/2/account/balance';
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getOrder = function(orderId){
    var url = 'api/2/order';
    if(orderId !== undefined){
        url += '/' + orderId;
    }
    return new Promise(function(resolve,reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
//used to create a new order or update an existing one
self.updateOrder = function(order,orderId){
    var url = 'api/2/order';
    var method = 'POST';
    if(orderId !== undefined){
        url += '/' + orderId;
        method = 'PUT';
    }
    return new Promise(function(resolve, reject){
        self.httpRequest(method,url,order,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.cancelOrder = function(orderId){
    var url = 'api/2/order';
    if(orderId !== undefined){
        url += '/' + orderId;
    }
    return new Promise(function(resolve,reject){
        self.httpRequest('DELETE',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTradingCommission = function(symbol){
    var url = 'api/2/trading/fee/' + symbol;
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getOrderHistory = function(){
    var url = 'api/2/history/order';
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTradeHistory = function(){
    var url = 'api/2/history/trades';
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTrades = function(orderId){
    var url = 'api/2/history/order/' + orderId + '/trades';
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getDepositAddress = function(currency){
    var url = 'api/2/account/crypto/address/' + currency;
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.createDepositAddress = function(currency){
    var url = 'api/2/account/crypto/address/' + currency;
    return new Promise(function(resolve, reject){
        self.httpRequest('POST',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.withdraw = function(withdralObj){
    var url = 'api/2/account/crypto/withdraw';
    return new Promise(function(resolve, reject){
        self.httpRequest('POST',url,withdralObj,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.commitWithdraw = function(withdrawlId){
    var url = 'api/2/account/crypto/withdraw/' + withdrawlId;
    return new Promise(function(resolve, reject){
        self.httpRequest('PUT',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.rollbackWithdraw = function(withdrawlId){
    var url = 'api/2/account/crypto/withdraw/' + withdrawlId;
    return new Promise(function(resolve, reject){
        self.httpRequest('DELETE',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.transferFunds = function(transferObj){
    var url = 'api/2/account/transfer';
    return new Promise(function(resolve, reject){
        self.httpRequest('POST',url,transferObj,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}
self.getTransactionHistory = function(transactionId){
    var url = 'api/2/account/transactions/';
    if(transactionId !== undefined){
        url += transactionId;
    }
    return new Promise(function(resolve, reject){
        self.httpRequest('GET',url,null,self.buildAuthHeader()).then(function(response){
            resolve(response);
        },function(err){
            reject(err);
        });
    });
}


module.exports = self;