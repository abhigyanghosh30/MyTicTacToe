var TicTacToe = artifacts.require('tic');

contract('tic',function(accounts){
    it("should deploy the contract",()=>{
        return TicTacToe.deployed().then((instance)=>{
            return instance.getBalance();
        }).then((balance)=>{
            assert.equal(balance.valueOf(), web3.utils.toWei("0","ether"), "Ether was paid. Contract should have zero ether before players join");
        });
    });
    let new_instance;
    it("Players should be able to join",()=>{
        return TicTacToe.deployed().then((instance)=>{
            new_instance = instance;
        }).then(()=>{
            new_instance.joinGame({from:accounts[1],value:web3.utils.toWei("1","ether")});
        }).then(()=>{
            return new_instance.getBalance();        
        }).then((balance)=>{
            console.log(balance.valueOf());
            assert.equal(balance.valueOf(), web3.utils.toWei("1","ether"), "Final contract balance should have been 1 ether after one player joins");
            new_instance.joinGame({from:accounts[2],value:web3.utils.toWei("1","ether")});
            return new_instance.printPlayers();
        }).then((players_tuple)=>{
            assert.equal(players_tuple[0],accounts[1]);
            assert.equal(players_tuple[1],accounts[2]);
        }).then(()=>{
            return new_instance.getBalance();        
        }).then((balance)=>{
            assert.equal(balance.valueOf(), web3.utils.toWei("2","ether"), "Final contract balance should have been 1 ether after one player joins");
        });
    });
    it("Player should be able to make a move",()=>{
        return TicTacToe.deployed().then((instance)=>{
            new_instance = instance;
        }).then(()=>{
            new_instance.joinGame({from:accounts[1],value:web3.utils.toWei("1","ether")});
            new_instance.joinGame({from:accounts[2],value:web3.utils.toWei("1","ether")});
        }).then(()=>{
            new_instance.Move(1,1,{from:accounts[1]});
        }).then(()=>{
            return new_instance.tostring(1,1);
        }).then((chara)=>{
            assert.equal(chara,"X");
        });
    });
});