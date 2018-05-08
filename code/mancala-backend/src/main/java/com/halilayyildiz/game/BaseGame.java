package com.halilayyildiz.game;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class BaseGame
{
	protected String				id;
	protected int					capacity;
	protected Map<String, IPlayer>	players	= Collections.synchronizedMap(new LinkedHashMap<>());

	public BaseGame()
	{
		this.id = UUID.randomUUID().toString();
	}

}
