package com.halilayyildiz.game.base;

import org.springframework.stereotype.Component;

import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.mancala.data.model.MancalaPlayer;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@Component
public class PlayerProvider
{
    IPlayer get(GameType type) throws GameTypeInvalidException
    {
        switch (type)
        {
        case MANCALA:
            return new MancalaPlayer();
        default:
            throw new GameTypeInvalidException("Game type not found !" + type);
        }
    }

}
