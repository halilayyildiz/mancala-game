package com.halilayyildiz.game.mancala;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.halilayyildiz.game.GameApp;
import com.halilayyildiz.game.model.GameType;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MancalaGameTest
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
	public void whenMancalaGame()
	{
		assertNotNull(mancalaGame);
		assertNotNull(mancalaPlayer);

		assertNotNull(mancalaGame.getId());
		assertNotNull(mancalaGame.getBoard());
		assertEquals(mancalaGame.getType(), GameType.MANCALA);
	}

	@Test
	public void whenMancalaGameWithPlayer()
	{
		assertNotNull(mancalaGame);
		assertNotNull(mancalaPlayer);

		mancalaGame.addPlayer(mancalaPlayer);
		assertNotNull(mancalaGame.getPlayers().values().stream().findFirst().get());
		assertEquals(mancalaGame.getPlayers().size(), 1);
		assertEquals(mancalaGame.getCapacity(), 2);
		assertFalse(mancalaGame.isFull());
	}

}
