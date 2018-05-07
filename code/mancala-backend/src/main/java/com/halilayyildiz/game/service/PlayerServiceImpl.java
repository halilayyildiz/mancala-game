package com.halilayyildiz.game.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilayyildiz.game.base.PlayerStore;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IPlayer;

@Service
public class PlayerServiceImpl extends BaseService implements PlayerService
{
    @Autowired
    PlayerStore playerStore;

    @Override
    public IPlayer createPlayer(String playerName, GameType gameType)
    {
        IPlayer player = playerStore.createPlayer(playerName, gameType);
        return player;
    }

    @Override
    public Optional<IPlayer> getPlayer(String playerId)
    {
        Optional<IPlayer> maybePlayer = playerStore.find(playerId);
        return maybePlayer;
    }

}
