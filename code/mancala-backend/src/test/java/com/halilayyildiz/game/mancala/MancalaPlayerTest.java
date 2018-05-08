package com.halilayyildiz.game.mancala;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.halilayyildiz.game.GameApp;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MancalaPlayerTest
{
	@Autowired
	private MancalaPlayer	mancalaPlayer;

	@Autowired
	private MancalaGame		mancalaGame;

	@Before
	public void setUp()
	{

	}

	@Test
	public void whenMancalaPlayer()
	{
		assertNotNull(mancalaGame);
		assertNotNull(mancalaPlayer);

		assertNotNull(mancalaPlayer.getId());
	}

	@Test
	public void whenMancalaPlayerJoinedGame()
	{
		assertNotNull(mancalaGame);
		assertNotNull(mancalaPlayer);

		mancalaPlayer.join(mancalaGame);
		assertNotNull(mancalaPlayer.getGame());
		assertNotNull(mancalaPlayer.getPlayerIndex());
	}

	@Test
	public void whenMancalaPlayerMove()
	{
		assertNotNull(mancalaGame);
		assertNotNull(mancalaPlayer);
		int pitNum = 1;

		mancalaPlayer.join(mancalaGame);
		int pitStoneCount = mancalaGame.getBoard().getPlayerPits()[mancalaPlayer.getPlayerIndex()][pitNum - 1];

		mancalaPlayer.move(new PlayerMove(mancalaGame, mancalaPlayer, pitNum));
		assertNotEquals(pitStoneCount, mancalaGame.getBoard().getPlayerPits()[mancalaPlayer.getPlayerIndex()][pitNum - 1]);
	}
}
