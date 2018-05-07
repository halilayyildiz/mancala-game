package com.halilayyildiz.game.base;

import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@Component
public class PlayerStore
{
	@Autowired
	PlayerProvider							playerProvider;

	private Map<String, Optional<IPlayer>>	players	= new HashedMap<>();

	public PlayerStore()
	{

	}

	public IPlayer createPlayer(String playerName, GameType gameType)
	{
		IPlayer player = playerProvider.get(gameType);
		player.setName(playerName);
		players.put(player.getId(), Optional.of(player));

		return player;
	}

	public Optional<IPlayer> find(String playerId)
	{
		return players.get(playerId);
	}

}
