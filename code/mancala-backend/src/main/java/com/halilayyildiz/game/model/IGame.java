package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;

public interface IGame
{
    String getId();

    GameType getType();

    int getMaxPlayerCapacity();

    boolean isFull();

    int addPlayer(IPlayer player);

    IGameStatus onPlayerMove(PlayerMove playerMove);

    IGameStatus getStatus();

}
