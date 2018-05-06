package com.halilayyildiz.game.mancala.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.halilayyildiz.game.model.GameType;

import lombok.Data;

@Data
@Entity
@Table(name = "PLAYER_EVENT")
public class PlayerEvent extends BaseEntity
{
	@Column(name = "PLAYER_ID")
	private String		playerId;

	@Enumerated(EnumType.STRING)
	@Column(name = "GAME_TYPE")
	private GameType	gameType;

	@Column(name = "GAME_ID")
	private String		gameId;

	@Column(name = "ACTION")
	private String		action;

	@Column(name = "EVENT_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date		date;

}
