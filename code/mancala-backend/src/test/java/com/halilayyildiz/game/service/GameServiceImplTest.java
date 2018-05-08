package com.halilayyildiz.game.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.halilayyildiz.game.GameStore;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GameServiceImplTest
{
	@Autowired
	private GameStore		gameStore;

	@Autowired
	private GameServiceImpl	gameService;

	@Before
	public void setUp()
	{

	}

	@Test
	public void whenFindGame()
	{
		IGame game = gameService.findOpenGame(GameType.MANCALA);
		assertNotNull(game);
		assertNotNull(game.getId());
	}

	@Test
	public void whenGetGame()
	{
		IGame game = gameStore.createGame(GameType.MANCALA);

		IGame gameFetched = gameService.getGame(game.getId()).get();
		assertNotNull(game);
		assertNotNull(game.getId());
		assertEquals(game, gameFetched);
	}
}
