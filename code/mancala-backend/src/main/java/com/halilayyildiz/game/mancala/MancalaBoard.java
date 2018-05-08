package com.halilayyildiz.game.mancala;

import lombok.Data;

@Data
public class MancalaBoard
{
    private int[] playerKalahs = new int[2];
    private int[][] playerPits = new int[2][6];

    public MancalaBoard()
    {
        playerKalahs[0] = 0;
        playerKalahs[1] = 0;

        for (int i = 0; i < playerPits.length; i++)
        {
            for (int j = 0; j < playerPits[i].length; j++)
            {
                playerPits[i][j] = 6;
            }
        }
    }
}
