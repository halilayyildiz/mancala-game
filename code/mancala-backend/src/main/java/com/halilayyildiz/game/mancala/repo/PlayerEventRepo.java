package com.halilayyildiz.game.mancala.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halilayyildiz.game.mancala.data.entity.PlayerEvent;

public interface PlayerEventRepo extends JpaRepository<PlayerEvent, String>
{

}
