package com.halilayyildiz.game.mancala.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;
import com.halilayyildiz.game.model.GameRepository;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;

@Service
public class GameServiceImpl extends BaseService implements GameService
{
	@Autowired
	GameRepository gameRepo;

	@Override
	public IGameStatus joinGame(GameType gameType, String playerName)
	{
		IGame gameFound = gameRepo.findGame(gameType);

		System.out.println("join game called - " + gameType + " " + playerName);

		return null;
	}

	@Override
	public IGameStatus playerMove(String gameId, String playerId, PlayerMove playerMove)
	{

		System.out.println("player moved - " + gameId + " " + playerId + " " + playerMove);

		return null;
	}

}
