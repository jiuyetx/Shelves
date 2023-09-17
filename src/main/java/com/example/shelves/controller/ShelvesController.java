package com.example.shelves.controller;

import cn.hutool.core.collection.CollectionUtil;
import com.example.shelves.dao.GoodsRepository;
import com.example.shelves.entity.Goods;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/shelves")
public class ShelvesController {
    private final GoodsRepository goodsRepository;

    public ShelvesController(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }

    @GetMapping("{number}")
    public ResponseEntity<Map<Long, List<Goods>>> info(@PathVariable("number") Long number) {
        List<Goods> all = goodsRepository.findAllByShelvesNo(number);
        Map<Long, List<Goods>> result = new HashMap<>();
        if (CollectionUtil.isNotEmpty(all)) {
            result = all.stream().collect(Collectors.groupingBy(Goods::getFloor));
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("chart")
    public ResponseEntity<Map<String, Object>> chart() {
        Map<String, Object> result = new HashMap<>();
        // 3个库，菜库，鱼肉库，粮食库,每个库都是2-3个货架，3层
        int shelvesNumb = 9;
        int floor = 3;
        List<Map<String, Object>> collect = new ArrayList<>();
        LinkedList<String> list = new LinkedList<>();
        LinkedList<String> xAxis = new LinkedList<>();
        for (int i = 1; i <= shelvesNumb ; i++) {
            for (int j = 1; j <= floor ; j++) {
                String index = i + String.valueOf(j);
                list.add(index);
                xAxis.add("No." + index);
            }
        }

        List<Goods> all = goodsRepository.findAll();
        for (Goods goods : all) {
            String index = goods.getShelvesNo() + String.valueOf(goods.getFloor());

            Map<String, Object> info = new HashMap<>();
            info.put("name", goods.getName());
            info.put("type", "bar");
            HashMap<String, String> emphasis = new HashMap<>();
            emphasis.put("focus", "series");
            info.put("emphasis", emphasis);
            info.put("stack", index);
            info.put("data", getGoodsData(list, index, goods.getNumber()));
            collect.add(info);
        }
        result.put("series", collect);
        result.put("xAxis", xAxis);
        return ResponseEntity.ok(result);
    }

    private int[] getGoodsData(LinkedList<String> list, String index, Integer value) {
        int[] data = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            if (list.indexOf(index) == i) {
                data[i] = value;
            } else {
                data[i] = 0;
            }
        }

        return data;
    }
}
