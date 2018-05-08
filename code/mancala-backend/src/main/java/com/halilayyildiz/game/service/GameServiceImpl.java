package com.halilayyildiz.game.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilayyildiz.game.GameStore;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

@Service
public class GameServiceImpl extends BaseService implements GameService
{
    @Autowired
    GameStore gameStore;

    @Override
    public Optional<IGame> getGame(String gameId)
    {
        return gameStore.getGame(gameId);
    }

    public IGame findOpenGame(GameType gameType)
    {
        return gameStore.findOpenGame(gameType);
    }

}
