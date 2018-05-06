package com.halilayyildiz.game.mancala.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.halilayyildiz.game.exception.GameTypeInvalidException;
import com.halilayyildiz.game.mancala.data.model.PlayerMove;
import com.halilayyildiz.game.mancala.service.GameService;
import com.halilayyildiz.game.model.GameType;
import com.halilayyildiz.game.model.IGameStatus;
import com.halilayyildiz.game.util.GameTypeResolver;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class GamePlayController
{
	@Autowired
	GameService gameService;

	@RequestMapping(value = "/game/join", method = RequestMethod.GET)
	public ResponseEntity<IGameStatus> joinGame(@RequestParam("gameType") String type, @RequestParam("playerName") String playerName)
			throws GameTypeInvalidException
	{
		GameType gameType = GameTypeResolver.get(type).orElseThrow(() -> new GameTypeInvalidException("Invalid Game Type: " + type));
		gameService.joinGame(gameType, playerName);

		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/player/move", method = RequestMethod.GET)
	public ResponseEntity<IGameStatus> playerMove(@RequestParam("gameId") String gameId, @RequestParam("playerId") String playerId)
	{
		gameService.playerMove(gameId, playerId, new PlayerMove());

		return ResponseEntity.ok(null);
	}

}
