package com.halilayyildiz.game.service;

import java.util.Optional;

import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

public interface GameService
{
    Optional<IGame> getGame(String gameId);

    IGame findOpenGame(GameType gameType);
}
