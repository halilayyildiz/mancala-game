package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;

public interface IGameRule
{
	// return active player Id
	void execute(PlayerMove move);

}
