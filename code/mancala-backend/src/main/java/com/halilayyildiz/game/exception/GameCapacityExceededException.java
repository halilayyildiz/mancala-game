package com.halilayyildiz.game.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Game Capacity Exceeded")
public class GameCapacityExceededException extends RuntimeException
{
	public GameCapacityExceededException(String message)
	{
		super(message);
	}

}
