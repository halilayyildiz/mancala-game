package com.halilayyildiz.game.model;

import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameRepository
{
	@Autowired
	GameProvider		gameProvider;

	Map<String, IGame>	games	= new HashedMap<>();

	public GameRepository()
	{

	}

	public IGame findGame(GameType gameType)
	{
		IGame gameInstance = games.values().stream()
				.filter(game -> game.getType().equals(gameType))
				.filter(game -> !game.isFull())
				.findFirst()
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
