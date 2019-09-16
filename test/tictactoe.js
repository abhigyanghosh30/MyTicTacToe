
var TicTacToe = artifacts.require('tic');

contract('tic',function(accounts){

    // Unit testing
    // it("Test Move")

    it("should deploy the contract",()=>{
        return TicTacToe.deployed().then((instance)=>{
            return instance.getBalance();
        })
        .then((balance)=>{
            assert.equal(balance.valueOf(), web3.utils.toWei("0","ether"), "Ether was paid. Contract should have zero ether before players join");
        });
    });

    it("Players should be able to join",()=>{
        return TicTacToe.deployed()
        .then(async function(instance){
            await instance.joinGame({from:accounts[1],value:web3.utils.toWei("4","ether")});
            await instance.joinGame({from:accounts[2],value:web3.utils.toWei("4","ether")});
            return instance.getBalance();
        })
        .then(async function(balance){
            assert.equal(balance.valueOf(),web3.utils.toWei("8","ether"));
        });
        
    });

    it("Unit test for turn taking function",()=>{
        return TicTacToe.deployed()
        .then(async function(instance){
            var a =[];
            await instance.turn().then((data)=>{a[0]=data});
            await instance.printPlayers().then((data)=>{a[1]=data['0']});
            return a;
        })
        .then((a)=>{
            // console.log(a);
            assert.equal(a[0],a[1]);
        });
    });

    it("unit testing for InBounds",async function(){
        return TicTacToe.deployed()
        .then(async function(instance){
            var a = [];
            await instance.InBounds(0,0).then((data)=>{a.push(data)});
            await instance.InBounds(0,1).then((data)=>{a.push(data)});
            await instance.InBounds(0,2).then((data)=>{a.push(data)});
            await instance.InBounds(0,3).then((data)=>{a.push(data)});
            await instance.InBounds(1,0).then((data)=>{a.push(data)});
            await instance.InBounds(1,1).then((data)=>{a.push(data)});
            await instance.InBounds(1,2).then((data)=>{a.push(data)});
            await instance.InBounds(1,3).then((data)=>{a.push(data)});
            await instance.InBounds(2,0).then((data)=>{a.push(data)});
            await instance.InBounds(2,1).then((data)=>{a.push(data)});
            await instance.InBounds(2,2).then((data)=>{a.push(data)});
            await instance.InBounds(2,3).then((data)=>{a.push(data)});
            await instance.InBounds(3,0).then((data)=>{a.push(data)});
            await instance.InBounds(3,1).then((data)=>{a.push(data)});
            await instance.InBounds(3,2).then((data)=>{a.push(data)});
            await instance.InBounds(3,3).then((data)=>{a.push(data)});
            await instance.InBounds(-1,0).then((data)=>{a.push(data)});
            await instance.InBounds(-1,1).then((data)=>{a.push(data)});
            await instance.InBounds(-1,2).then((data)=>{a.push(data)});
            await instance.InBounds(-1,3).then((data)=>{a.push(data)});
            return a;
        }).then((resp)=>{
            console.log(resp);
            // assert()
        });
    });

    it("Players should be able to Move",()=>{
        return TicTacToe.deployed()
        .then(async function(instance){
            await instance.Move(0,0,{from:accounts[1]});
            await instance.Move(0,1,{from:accounts[2]});
            let a = [];
            await instance.tostring(0,0).then((data)=>{return a[0]=data;});
            await instance.tostring(0,1).then((data)=>{return a[1]=data;});
            return a;
        })
        .then(async function(values){
            // console.log(values);
            assert.equal(values[0].valueOf(),"X");
            assert.equal(values[1].valueOf(),"O");
        });
        
    });

    it("Players should be able to Win",()=>{
        return TicTacToe.deployed()
        .then(async function(instance){
            await instance.Move(1,0,{from:accounts[1]});
            await instance.Move(1,1,{from:accounts[2]});
            await instance.Move(2,0,{from:accounts[1]});
            return instance.over();
        })
        .then(async function(values){
            console.log(values);
            assert.isTrue(values);
        }); 
    });

    it("Anyone should be able to start new game when the old game is over", ()=>{
        return TicTacToe.deployed()
        .then(async function(instance){
            await instance.startNewGame();
            var a=[];
            await instance.games.call().then((data)=>{a[0]=data});
            await instance.cm.call().then((data)=>{a[1]=data});
            return a;
        }).then((a)=>{
            assert.equal(a[0].valueOf(),1);
            assert.equal(a[1].valueOf(),0);
        });
    });



});