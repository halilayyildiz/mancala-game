package com.halilayyildiz.game;

import java.util.LinkedHashMap;
import java.util.UUID;

import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class BaseGame
{
	protected String							id;
	protected int								capacity;
	protected LinkedHashMap<String, IPlayer>	players	= new LinkedHashMap<>();

	public BaseGame()
	{
		this.id = UUID.randomUUID().toString();
	}

}
