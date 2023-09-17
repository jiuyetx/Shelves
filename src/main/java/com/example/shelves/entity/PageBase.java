package com.example.shelves.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
@JsonSerialize
public class PageBase<T> implements Serializable {

    @JsonProperty("total")
    private Integer total;
    @JsonProperty("data")
    private List<T> data;

    public PageBase(Integer total, List<T> data) {
        this.total = total;
        this.data = data;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
