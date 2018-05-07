package com.halilayyildiz.game.mancala.rule;

import com.halilayyildiz.game.mancala.data.model.MancalaGame;

public class MancalaGameRule1 implements MancalaGameRule
{
    @Override
    public void execute(MancalaGame game)
    {
        int[] playerKalahs = game.getBoard().getPlayerKalahs();
        playerKalahs[0] = 10;
        playerKalahs[1] = 5;
        
        int[][] playerPits = game.getBoard().getPlayerPits();
        
        playerPits[0][0]++;
        playerPits[1][1]++;
    }

}
