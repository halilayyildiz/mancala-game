package com.halilayyildiz.game;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.mancala.MancalaPlayer;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@Component
public class PlayerProvider
{
	@Autowired
	private ObjectFactory<MancalaPlayer> mancalaPlayerFactory;

	IPlayer get(GameType type) throws GameTypeInvalidException
	{
		switch (type)
		{
			case MANCALA:
				return mancalaPlayerFactory.getObject();
			default:
				throw new GameTypeInvalidException("Game type not found !" + type);
		}
	}

}
