package com.halilayyildiz.game.mancala.data.model;

import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IPlayer;
import com.halilayyildiz.game.model.IPlayerAction;

import lombok.Data;

@Data
public class PlayerMove implements IPlayerAction
{
    private IGame game;
    private IPlayer player;
    private int pitNum;

    public PlayerMove(IGame game, IPlayer player, int pitNum)
    {
        this.game = game;
        this.player = player;
        this.pitNum = pitNum;
    }

}
