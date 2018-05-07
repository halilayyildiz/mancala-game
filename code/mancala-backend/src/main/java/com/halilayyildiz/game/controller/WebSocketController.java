package com.halilayyildiz.game.controller;

import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController
{

	// @Autowired
	// private SimpMessageSendingOperations messagingTemplate;
	//
	// @MessageMapping("/message")
	// @SendTo("/topic/reply")
	// public String processMessageFromClient(@Payload String message) throws Exception
	// {
	// String name = new Gson().fromJson(message, Map.class).get("name").toString();
	// return name;
	// }
	//
	// @MessageExceptionHandler
	// public String handleException(Throwable exception)
	// {
	// messagingTemplate.convertAndSend("/errors", exception.getMessage());
	// return exception.getMessage();
	// }

}
