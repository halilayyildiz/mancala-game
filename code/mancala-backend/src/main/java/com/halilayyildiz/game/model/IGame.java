package com.halilayyildiz.game.model;

public interface IGame
{
	String getId();

	GameType getType();

	int getMaxPlayerCapacity();

	boolean isFull();

	IGameStatus getStatus();

	IGameStatus addPlayer(IPlayer player);

}
