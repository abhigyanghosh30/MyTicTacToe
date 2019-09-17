
var TicTacToe = artifacts.require('tic');

advanceTime = (time) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.sendAsync({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [time],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            return resolve(result);
        });
    });
}

contract('tic',function(accounts){
    it("Timeout checks",function(){
        return TicTacToe.deployed()
        .then(async (instance)=>{
            await instance.joinGame({from:accounts[5],value:web3.utils.toWei("4","ether")});
            await instance.joinGame({from:accounts[6],value:web3.utils.toWei("4","ether")});
            await instance.PlayerMoves(2,{from:accounts[5]});
            await setTimeout(async()=>{
                await instance.claimTimeout();
                var balance=[]
                await web3.eth.getBalance(accounts[5]).then((data)=>{balance[0]=data});
                await web3.eth.getBalance(accounts[6]).then((data)=>{balance[1]=data});
                AssertionError.istrue(parseFloat(balance[0])>101);
                AssertionError.istrue(parseFloat(balance[1])<101);
            },70000);
        })
    });
});

