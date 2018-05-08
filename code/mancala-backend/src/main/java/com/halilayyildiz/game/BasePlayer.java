package com.halilayyildiz.game;

import java.util.UUID;

import lombok.Data;

@Data
public class BasePlayer
{
    protected String id;
    protected String name;

    public BasePlayer()
    {
        this.id = UUID.randomUUID().toString();
    }

}
