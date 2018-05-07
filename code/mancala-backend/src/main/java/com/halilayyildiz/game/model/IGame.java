package com.halilayyildiz.game.model;

import java.util.LinkedHashMap;

import com.halilayyildiz.game.mancala.data.model.PlayerMove;

public interface IGame
{
	String getId();

	GameType getType();

	int getMaxPlayerCapacity();

	boolean isFull();

	int addPlayer(IPlayer player);

	void setActivePlayerId(String playerId);

	LinkedHashMap<String, IPlayer> getPlayers();

	IGameStatus onPlayerMove(PlayerMove playerMove);

	IGameStatus getStatus();

}
