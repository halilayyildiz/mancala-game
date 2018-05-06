package com.halilayyildiz.game.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Game Type Not Found")
public class GameTypeInvalidException extends RuntimeException
{
	public GameTypeInvalidException(String message)
	{
		super(message);
	}

}
