package com.halilayyildiz.game.config;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>
{

	@Override
	public void customize(ConfigurableServletWebServerFactory server)
	{
		server.setPort(8080);
	}

}
