package com.halilayyildiz.game.repo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.halilayyildiz.game.mancala.MancalaGame;
import com.halilayyildiz.game.mancala.MancalaPlayer;
import com.halilayyildiz.game.mancala.data.entity.PlayerAction;
import com.halilayyildiz.game.mancala.repo.PlayerActionRepo;
import com.halilayyildiz.game.model.GameType;

@RunWith(SpringRunner.class)
@DataJpaTest
public class PlayerActionRepoTest
{
	@Autowired
	private MancalaGame			mancalaGame;

	@Autowired
	private MancalaPlayer		mancalaPlayer;

	@Autowired
	private PlayerActionRepo	playerEventRepo;

	@Ignore
	@Test
	public void whenFindByGameId()
	{
		PlayerAction playerAction = playerEventRepo.save(new PlayerAction(mancalaPlayer.getId(), GameType.MANCALA, mancalaGame.getId(), "Test", new Date()));

		List<PlayerAction> playerActions = playerEventRepo.findByGameId(mancalaGame.getId());
		assertNotNull(playerAction);
		assertNotNull(playerActions);
		assertTrue(playerActions.size() > 0);

		PlayerAction playerActionFound = playerActions.stream().findFirst().get();
		assertNotNull(playerActionFound);
		assertEquals(playerActionFound.getGameId(), playerAction.getGameId());
		assertEquals(playerActionFound.getPlayerId(), playerAction.getGameId());
		assertEquals(playerActionFound.getGameType(), playerAction.getGameType());
		assertEquals(playerActionFound.getAction(), playerAction.getGameType());
	}

}
