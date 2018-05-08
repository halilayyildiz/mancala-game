package com.halilayyildiz.game.mancala;

import java.util.HashMap;
import java.util.Map;

import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class MancalaGameStatus implements IGameStatus
{
    private String activePlayerId;

    private Map<String, IPlayer> players = new HashMap<>();

    private MancalaBoard board;

    public MancalaGameStatus(String activePlayerId, MancalaBoard board)
    {
        this.activePlayerId = activePlayerId;
        this.board = board;
    }

}
