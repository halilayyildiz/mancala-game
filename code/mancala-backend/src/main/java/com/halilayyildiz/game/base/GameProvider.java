package com.halilayyildiz.game.base;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.mancala.data.model.MancalaGame;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

@Component
public class GameProvider
{
	@Autowired
	private ObjectFactory<MancalaGame> mancalaGameFactory;

	IGame get(GameType type) throws GameTypeInvalidException
	{
		switch (type)
		{
			case MANCALA:
				return mancalaGameFactory.getObject();
			default:
				throw new GameTypeInvalidException("Game type not found !" + type);
		}
	}

}
