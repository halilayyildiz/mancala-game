package com.halilayyildiz.game.base;

import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

@Component
public class GameStore
{
    @Autowired
    GameProvider gameProvider;

    Map<String, IGame> games = new HashedMap<>();

    public GameStore()
    {

    }

    public Optional<IGame> getGame(String gameId)
    {
        return Optional.of(games.get(gameId));
    }

    public IGame findOpenGame(GameType gameType)
    {
        IGame gameInstance = games.values().stream().filter(game -> game.getType().equals(gameType)).filter(game -> !game.isFull()).findFirst()
                .orElseGet(() -> this.createGame(gameType));

        return gameInstance;
    }

    public IGame createGame(GameType gameType)
    {
        IGame game = gameProvider.get(gameType);
        games.put(game.getId(), game);

        return game;
    }

}
