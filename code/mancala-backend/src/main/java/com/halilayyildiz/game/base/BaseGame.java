package com.halilayyildiz.game.base;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class BaseGame
{
    protected String id;
    protected int capacity;
    protected Map<String, IPlayer> players = new HashMap<>();

    public BaseGame()
    {
        this.id = UUID.randomUUID().toString();
    }

}
