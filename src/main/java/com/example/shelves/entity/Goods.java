package com.example.shelves.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "goods")
@EntityListeners(value = AuditingEntityListener.class)
public class Goods {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private Integer number;

    private String unit;

    private Long shelvesNo;

    private Long floor;
    @CreatedBy
    private String creator;
    @CreatedDate
    private Date createTime;
    @LastModifiedBy
    private String updater;
    @LastModifiedDate
    private Date updateTime;
}
