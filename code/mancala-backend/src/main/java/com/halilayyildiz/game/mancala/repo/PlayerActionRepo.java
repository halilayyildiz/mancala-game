package com.halilayyildiz.game.mancala.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.halilayyildiz.game.mancala.data.entity.PlayerAction;

public interface PlayerActionRepo extends CrudRepository<PlayerAction, String>
{
	List<PlayerAction> findByGameId(String gameId);
}
