package com.halilayyildiz.game.service;

import java.util.Optional;

import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.vbauer.herald.annotation.Log;
import com.halilayyildiz.game.base.PlayerStore;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@Service
public class PlayerServiceImpl extends BaseService implements PlayerService
{
	@Log
	private Logger	logger;

	@Autowired
	PlayerStore		playerStore;

	@Override
	public IPlayer createPlayer(String playerName, GameType gameType)
	{
		IPlayer player = playerStore.createPlayer(playerName, gameType);

		logger.info("Player created: " + player.getId());
		return player;
	}

	@Override
	public Optional<IPlayer> getPlayer(String playerId)
	{
		Optional<IPlayer> maybePlayer = playerStore.find(playerId);
		return maybePlayer;
	}

}
