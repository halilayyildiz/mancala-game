package com.halilayyildiz.game.util;

import java.util.Optional;

import com.halilayyildiz.game.model.GameType;

public class GameTypeResolver
{
	static public Optional<GameType> get(String type)
	{
		try
		{
			return Optional.of(GameType.valueOf(type.toUpperCase()));
		}
		catch (Exception e)
		{
			return Optional.empty();
		}
	}

}
