var TicTacToe = artifacts.require('tic');

contract('tic',function(accounts){
    it("should deploy the contract",()=>{
        return TicTacToe.deployed().then((instance)=>{
            return instance.getBalance();
        }).then((balance)=>{
            assert.equal(balance.valueOf(), web3.utils.toWei("1","ether"), "1 ether wasnot paid");
        });
    });
    let new_instance;
    it("Another player should be able to join",()=>{
        return TicTacToe.deployed().then((instance)=>{
            new_instance = instance;
        }).then(()=>{
            new_instance.joinGame({from:accounts[1],value:web3.utils.toWei("1","ether")});
        }).then(()=>{
            return new_instance.getBalance();        
        }).then((balance)=>{
            assert.equal(balance.valueOf(), web3.utils.toWei("2","ether"), "Final contract balance should have been 2 ethers");
            return new_instance.printPlayers();
        }).then((players_tuple)=>{
            assert.equal(players_tuple[1],accounts[1]);
            assert.equal(players_tuple[0],accounts[0]);
        });
    });
    it("Player should be able to make a move",()=>{
        return TicTacToe.deployed().then((instance)=>{
            new_instance = instance;
        }).then(()=>{
            new_instance.joinGame({from:accounts[1],value:web3.utils.toWei("1","ether")});
        }).then(()=>{
            return new_instance.Move(1,1,{from:accounts[0]});
        }).then((ret_vals)=>{
            console.log(ret_vals);
        });
    });
});