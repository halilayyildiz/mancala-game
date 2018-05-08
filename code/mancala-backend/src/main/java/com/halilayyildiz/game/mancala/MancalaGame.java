package com.halilayyildiz.game.mancala;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.github.vbauer.herald.annotation.Log;
import com.halilayyildiz.game.BaseGame;
import com.halilayyildiz.game.exception.GameCapacityExceededException;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameRule;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
@Component
@Scope("prototype")
public class MancalaGame extends BaseGame implements IGame
{
	private static final int	GAME_MAX_PLAYER_COUNT	= 2;

	@Log
	private Logger				logger;

	private MancalaBoard		board;
	private List<IGameRule>		rules					= new ArrayList<>();
	private String				activePlayerId			= null;

	public MancalaGame()
	{
		this.capacity = GAME_MAX_PLAYER_COUNT;
		this.board = new MancalaBoard();
		this.rules.add(new MancalaGameDefaultRule());
	}

	@Override
	public GameType getType()
	{
		return GameType.MANCALA;
	}

	@Override
	public int getMaxPlayerCapacity()
	{
		return this.capacity;
	}

	@Override
	public boolean isFull()
	{
		return this.capacity == this.players.size();
	}

	@Override
	public int addPlayer(IPlayer player)
	{
		if (this.players.size() < this.capacity)
		{
			this.players.put(player.getId(), player);
		}
		else
		{
			throw new GameCapacityExceededException("Game Id: " + getId());
		}

		if (isFull())
		{
			this.activePlayerId = players.keySet().stream().findFirst().get();
		}

		return this.players.size() - 1;
	}

	@Override
	public IGameStatus onPlayerMove(PlayerMove playerMove)
	{
		this.rules.forEach(rule -> rule.execute(playerMove));

		logger.info("Game [" + this.getId() + "] executed player move, player: " + playerMove.getPlayer().getId());
		return getStatus();
	}

	@Override
	public IGameStatus getStatus()
	{
		return new MancalaGameStatus(activePlayerId, this.board);
	}

}
