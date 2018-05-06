package com.halilayyildiz.game.mancala.data.model;

import com.halilayyildiz.game.exception.GameCapacityExceededException;
import com.halilayyildiz.game.model.BaseGame;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

public class MancalaGame extends BaseGame implements IGame
{
	public MancalaGame()
	{
		this.setCapacity(2);
	}

	@Override
	public GameType getType()
	{
		return GameType.MANCALA;
	}

	@Override
	public int getMaxPlayerCapacity()
	{
		return getCapacity();
	}

	@Override
	public boolean isFull()
	{
		return getCapacity() == getPlayers().size();
	}

	@Override
	public IGameStatus getStatus()
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IGameStatus addPlayer(IPlayer player)
	{
		if (getPlayers().size() < getCapacity())
		{
			getPlayers().add(player);
		}
		else
		{
			throw new GameCapacityExceededException("Game Id: " + getId());
		}

		return null;
	}

}
