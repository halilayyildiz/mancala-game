package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.PlayerMove;

public interface IPlayer
{
    String getId();

    String getName();

    Integer getPlayerIndex();

    void setName(String name);

    void join(IGame game);

    IGame getGame();

    IGameStatus move(PlayerMove move);

    IGameStatus resignGame();
}
