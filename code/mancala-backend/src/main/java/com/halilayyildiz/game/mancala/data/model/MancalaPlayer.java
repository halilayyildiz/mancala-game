package com.halilayyildiz.game.mancala.data.model;

import org.springframework.beans.factory.annotation.Autowired;

import com.halilayyildiz.game.mancala.service.GameService;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

public class MancalaPlayer implements IPlayer
{
	@Autowired
	GameService	gameService;

	MancalaGame	game;

	@Override
	public IGameStatus joinGame(GameType gameType)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IGameStatus makeMove(PlayerMove move)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IGameStatus resignGame()
	{
		// TODO Auto-generated method stub
		return null;
	}

}
