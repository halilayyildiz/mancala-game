package com.halilayyildiz.game.data.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity implements Serializable
{

	private static final long	serialVersionUID	= -1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", unique = true)
	protected String			id;

	@Override
	public int hashCode()
	{
		return id != null ? this.getClass().hashCode() + id.hashCode() : super.hashCode();
	}

	@Override
	public boolean equals(Object obj)
	{
		return obj != null && this.getClass() == obj.getClass()
				&& (obj instanceof BaseEntity && (id != null) ? id.equals(((BaseEntity) obj).id) : (obj == this));
	}

}
