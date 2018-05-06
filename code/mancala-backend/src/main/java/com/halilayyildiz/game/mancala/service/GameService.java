package com.halilayyildiz.game.mancala.service;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGameStatus;

public interface GameService
{
	IGameStatus joinGame(GameType gameType, String playerName);

	IGameStatus playerMove(String gameId, String playerId, PlayerMove playerMove);

}
