package com.halilayyildiz.game.model;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class BaseGame
{
	private String			id;
	private int				capacity;
	private List<IPlayer>	players;

	public BaseGame()
	{
		this.id = UUID.randomUUID().toString();
	}

}
