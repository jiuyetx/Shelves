package com.example.shelves.qo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

@Data
@JsonSerialize
public class FloorRequest {
    private Long id;
    private Long shelvesNo;
    private Long floor;
}
