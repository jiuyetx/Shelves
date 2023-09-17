package com.example.shelves.dao;

import com.example.shelves.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
    List<Goods> findAllByShelvesNo(Long number);
}
