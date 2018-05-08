package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.PlayerMove;

public interface IGameRule
{
	// return active player Id
	void execute(PlayerMove move);

}
