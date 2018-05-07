package com.halilayyildiz.game.mancala.data.model;

import com.halilayyildiz.game.base.BasePlayer;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class MancalaPlayer extends BasePlayer implements IPlayer
{
    private Integer playerIndex;
    private MancalaGame game;

    public MancalaPlayer()
    {
        super();
    }

    @Override
    public void join(IGame game)
    {
        this.game = (MancalaGame) game;
        this.playerIndex = this.game.addPlayer(this);
    }

    @Override
    public IGameStatus move(PlayerMove move)
    {
        return this.game.onPlayerMove(move);
    }

    @Override
    public IGameStatus resignGame()
    {
        // TODO Auto-generated method stub
        return null;
    }

}
