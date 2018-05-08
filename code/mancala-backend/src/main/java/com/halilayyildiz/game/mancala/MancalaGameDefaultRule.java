package com.halilayyildiz.game.mancala;

import com.halilayyildiz.game.model.IGameRule;

import lombok.Data;

@Data
public class MancalaGameDefaultRule implements IGameRule
{
	private static final int	MAX_PIT_COUNT	= 6;

	private String				activePlayerId;

	@Override
	public void execute(PlayerMove move)
	{
		activePlayerId = null;

		MancalaGame game = (MancalaGame) move.getGame();
		MancalaBoard board = game.getBoard();

		int actualPlayerIndex = move.getPlayer().getPlayerIndex();
		int actualPitNum = move.getPitNum();
		int[] playerKalahs = board.getPlayerKalahs();
		int[][] playerPits = board.getPlayerPits();

		int stoneCount = playerPits[actualPlayerIndex][actualPitNum - 1];
		System.out.println("stones: " + stoneCount);

		playerPits[actualPlayerIndex][actualPitNum - 1] = 0;

		for (int i = 0; i < stoneCount; i++)
		{
			if (actualPitNum < MAX_PIT_COUNT)
			{
				playerPits[actualPlayerIndex][actualPitNum]++;
			}
			else if (actualPitNum == MAX_PIT_COUNT)
			{
				playerKalahs[actualPlayerIndex]++;
				activePlayerId = move.getPlayer().getId();
			}
			else
			{
				actualPitNum = 0;
				actualPlayerIndex = getOtherPlayerIndex(actualPlayerIndex);
				playerPits[actualPlayerIndex][actualPitNum]++;
			}

			// if it is last stone and you put in empty pit, then collect all stones to your pit
			if (i == stoneCount - 1 && (actualPitNum != MAX_PIT_COUNT))
			{
				if (playerPits[actualPlayerIndex][actualPitNum] == 1)
				{
					playerKalahs[actualPlayerIndex] += playerPits[actualPlayerIndex][actualPitNum];
					playerKalahs[actualPlayerIndex] += playerPits[getOtherPlayerIndex(actualPlayerIndex)][(MAX_PIT_COUNT + 1) - actualPitNum];

					playerPits[actualPlayerIndex][actualPitNum] = 0;
					playerPits[getOtherPlayerIndex(actualPlayerIndex)][actualPitNum] = 0;
				}
			}
			else
			{
				actualPitNum++;
			}
		}

		if (activePlayerId == null)
		{
			activePlayerId = move.getGame().getPlayers().keySet().stream().filter(key -> key != move.getPlayer().getId()).findFirst().get();
		}
		move.getGame().setActivePlayerId(activePlayerId);
	}

	private int getOtherPlayerIndex(int thisPLayerIndex)
	{
		return (thisPLayerIndex == 0) ? 1 : 0;
	}

}
