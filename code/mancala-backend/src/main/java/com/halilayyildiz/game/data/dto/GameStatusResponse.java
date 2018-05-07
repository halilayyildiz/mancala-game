package com.halilayyildiz.game.data.dto;

import com.halilayyildiz.game.model.IGameStatus;

import lombok.Data;

@Data
public class GameStatusResponse
{
    private Result result;

    private IGameStatus status;

    public GameStatusResponse(IGameStatus status)
    {
        this.status = status;
    }

    public GameStatusResponse success()
    {
        this.result = Result.SUCCESS;
        return this;
    }

    public GameStatusResponse fail()
    {
        this.result = Result.FAIL;
        return this;
    }
}
