package com.halilayyildiz.game.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Game Not Found")
public class GameNotFoundException extends RuntimeException
{
    public GameNotFoundException(String message)
    {
        super(message);
    }

}
