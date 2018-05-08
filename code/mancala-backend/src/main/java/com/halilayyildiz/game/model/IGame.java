package com.halilayyildiz.game.model;

import java.util.Map;

import com.halilayyildiz.game.mancala.PlayerMove;

public interface IGame
{
	String getId();

	GameType getType();

	int getMaxPlayerCapacity();

	boolean isFull();

	int addPlayer(IPlayer player);

	void setActivePlayerId(String playerId);

	Map<String, IPlayer> getPlayers();

	IGameStatus onPlayerMove(PlayerMove playerMove);

	IGameStatus getStatus();

}
