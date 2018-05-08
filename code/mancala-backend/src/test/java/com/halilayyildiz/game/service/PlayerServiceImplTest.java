package com.halilayyildiz.game.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlayerServiceImplTest
{
	@Autowired
	private PlayerServiceImpl playerService;

	@Before
	public void setUp()
	{

	}

	@Test
	public void whenCreatePlayer()
	{
		String playerName = "Test Player";

		IPlayer player = playerService.createPlayer(playerName, GameType.MANCALA);
		assertNotNull(player);
		assertNotNull(player.getId());
		assertEquals(player.getName(), playerName);
	}

	@Test
	public void whenGetPlayer()
	{
		String playerName = "Test Player";
		IPlayer player = playerService.createPlayer(playerName, GameType.MANCALA);

		IPlayer playerFetched = playerService.getPlayer(player.getId()).get();
		assertNotNull(playerFetched);
		assertEquals(player.getId(), playerFetched.getId());
		assertEquals(player, playerFetched);
	}
}
