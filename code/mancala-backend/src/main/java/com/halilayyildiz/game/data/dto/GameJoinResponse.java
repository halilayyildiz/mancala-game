package com.halilayyildiz.game.data.dto;

import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class GameJoinResponse
{
    private Result result;

    private String gameId;
    private String playerId;
    private String playerName;
    private Integer playerIndex;

    public GameJoinResponse(IPlayer player)
    {
        this.gameId = player.getGame().getId();
        this.playerId = player.getId();
        this.playerName = player.getName();
        this.playerIndex = player.getPlayerIndex();
    }

    public GameJoinResponse success()
    {
        this.result = Result.SUCCESS;
        return this;
    }

    public GameJoinResponse fail()
    {
        this.result = Result.FAIL;
        return this;
    }
}
