package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;

public interface IPlayer
{
	IGameStatus joinGame(GameType gameType);

	IGameStatus makeMove(PlayerMove move);

	IGameStatus resignGame();
}
