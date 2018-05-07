package com.halilayyildiz.game.model;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;

public interface IGameRule
{
	void execute(PlayerMove move);

}
