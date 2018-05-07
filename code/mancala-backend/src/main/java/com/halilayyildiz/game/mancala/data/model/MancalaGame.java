package com.halilayyildiz.game.mancala.data.model;

import java.util.ArrayList;
import java.util.List;

import com.halilayyildiz.game.base.BaseGame;
import com.halilayyildiz.game.exception.GameCapacityExceededException;
import com.halilayyildiz.game.mancala.rule.MancalaGameRule;
import com.halilayyildiz.game.mancala.rule.MancalaGameRule1;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;

import lombok.Data;

@Data
public class MancalaGame extends BaseGame implements IGame
{
    private static final int GAME_MAX_PLAYER_COUNT = 2;

    private MancalaBoard board;
    private List<MancalaGameRule> rules = new ArrayList<>();
    private String activePlayerId = null;

    public MancalaGame()
    {
        this.capacity = GAME_MAX_PLAYER_COUNT;
        this.board = new MancalaBoard();
        this.rules.add(new MancalaGameRule1());
    }

    @Override
    public GameType getType()
    {
        return GameType.MANCALA;
    }

    @Override
    public int getMaxPlayerCapacity()
    {
        return this.capacity;
    }

    @Override
    public boolean isFull()
    {
        return this.capacity == this.players.size();
    }

    @Override
    public int addPlayer(IPlayer player)
    {
        if (this.players.size() < this.capacity)
        {
            this.players.put(player.getId(), player);
        }
        else
        {
            throw new GameCapacityExceededException("Game Id: " + getId());
        }

        if (activePlayerId == null)
        {
            this.activePlayerId = player.getId();
        }

        return this.players.size() - 1;
    }

    @Override
    public IGameStatus onPlayerMove(PlayerMove playerMove)
    {
        this.rules.forEach(rule -> rule.execute(this));
        this.activePlayerId = this.players.keySet().stream().filter(key -> key != playerMove.getPlayer().getId()).findFirst().get();

        return getStatus();
    }

    @Override
    public IGameStatus getStatus()
    {
        return new MancalaGameStatus(activePlayerId, this.board);
    }

}
