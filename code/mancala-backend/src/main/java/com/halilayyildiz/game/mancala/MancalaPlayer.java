package com.halilayyildiz.game.mancala;

import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.github.vbauer.herald.annotation.Log;
import com.halilayyildiz.game.BasePlayer;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
@Component
@Scope("prototype")
public class MancalaPlayer extends BasePlayer implements IPlayer
{
	@Log
	private Logger		logger;

	private Integer		playerIndex;
	private MancalaGame	game;

	public MancalaPlayer()
	{
		super();
	}

	@Override
	public void join(IGame game)
	{
		this.game = (MancalaGame) game;
		this.playerIndex = this.game.addPlayer(this);

		logger.info("Player " + this.id + " joined game: " + game.getId());
	}

	@Override
	public IGameStatus move(PlayerMove move)
	{
		logger.info("Player " + this.id + " moved pit: " + move.getPitNum() + ", on game: " + game.getId());

		IGameStatus playerMove = this.game.onPlayerMove(move);
		return playerMove;
	}

	@Override
	public IGameStatus resignGame()
	{
		// TODO Auto-generated method stub
		return null;
	}

}
