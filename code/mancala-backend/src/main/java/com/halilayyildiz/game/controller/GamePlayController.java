package com.halilayyildiz.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.halilayyildiz.game.data.dto.GameJoinResponse;
import com.halilayyildiz.game.data.dto.GameStatusResponse;
import com.halilayyildiz.game.exception.GameNotFoundException;
import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.exception.PlayerNotFoundException;
import com.halilayyildiz.game.mancala.data.model.PlayerMove;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGame;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.model.IPlayer;
import com.halilayyildiz.game.service.GameService;
import com.halilayyildiz.game.service.PlayerService;
import com.halilayyildiz.game.util.GameTypeResolver;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class GamePlayController
{
    @Autowired
    GameService gameService;

    @Autowired
    PlayerService playerService;

    @RequestMapping(value = "/game/join", method = RequestMethod.GET)
    public ResponseEntity<GameJoinResponse> joinGame(@RequestParam("gameType") String type, @RequestParam("playerName") String playerName)
            throws GameTypeInvalidException
    {
        GameType gameType = GameTypeResolver.get(type).orElseThrow(() -> new GameTypeInvalidException("Invalid Game Type: " + type));

        IPlayer player = playerService.createPlayer(playerName, gameType);
        IGame game = gameService.findOpenGame(gameType);

        player.join(game);

        System.out.println("Player connected: gameId" + player.getGame().getId() + " " + player.getId());

        return ResponseEntity.ok(new GameJoinResponse(player).success());
    }

    @RequestMapping(value = "/player/move", method = RequestMethod.GET)
    public ResponseEntity<GameStatusResponse> playerMove(@RequestParam("gameId") String gameId, @RequestParam("playerId") String playerId,
            @RequestParam("pitNum") Integer pitNum)
    {
        IPlayer player = playerService.getPlayer(playerId).orElseThrow(() -> new PlayerNotFoundException(playerId));
        IGame game = gameService.getGame(gameId).orElseThrow(() -> new GameNotFoundException(gameId));

        IGameStatus status = player.move(new PlayerMove(game, player, pitNum));

        System.out.println("Player moved: gameId" + player.getGame().getId() + " " + player.getId() + " - pit: " + pitNum);

        return ResponseEntity.ok(new GameStatusResponse(status).success());
    }

}
