package com.halilayyildiz.game.service;

import java.util.Optional;

import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

public interface PlayerService
{
    IPlayer createPlayer(String playerName, GameType gameType);

    Optional<IPlayer> getPlayer(String playerId);
}
