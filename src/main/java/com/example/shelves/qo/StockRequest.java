package com.example.shelves.qo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

@Data
@JsonSerialize
public class StockRequest {
    private Long id;
    private Integer number;
    private String type;
}
