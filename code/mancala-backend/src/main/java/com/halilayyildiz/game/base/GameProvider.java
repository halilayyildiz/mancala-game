package com.halilayyildiz.game.base;

import org.springframework.stereotype.Component;

import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.mancala.data.model.MancalaGame;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

@Component
public class GameProvider
{
	IGame get(GameType type) throws GameTypeInvalidException
	{
		switch (type)
		{
			case MANCALA:
				return new MancalaGame();
			default:
				throw new GameTypeInvalidException("Game type not found !" + type);
		}
	}

}
