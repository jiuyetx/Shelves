package com.example.shelves.qo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

@Data
@JsonSerialize
public class CreateGoodsRequest {
    private String name;
    private Integer number;
    private String unit;
    private Long shelvesNo;
    private Long floor;
}
