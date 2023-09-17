package com.example.shelves.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonSerialize
public class OperateLogVo {
    private Long id;
    private String operate;
    private Integer number;
    private String context;
    private String creator;
    private Date createTime;
    private String updater;
    private Date updateTime;
}
