package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.PlayerMove;

public interface IGameRule
{
	void execute(PlayerMove move);

}
