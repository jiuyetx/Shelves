package com.example.shelves.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.extra.cglib.CglibUtil;
import com.example.shelves.dao.GoodsRepository;
import com.example.shelves.dao.OperationLogRepository;
import com.example.shelves.entity.Goods;
import com.example.shelves.entity.OperationLog;
import com.example.shelves.entity.PageBase;
import com.example.shelves.qo.CreateGoodsRequest;
import com.example.shelves.qo.FloorRequest;
import com.example.shelves.qo.StockRequest;
import com.example.shelves.vo.GoodsVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/goods")
public class GoodsController {
    private final GoodsRepository goodsRepository;
    private final OperationLogRepository logRepository;

    public GoodsController(GoodsRepository goodsRepository, OperationLogRepository logRepository) {
        this.goodsRepository = goodsRepository;
        this.logRepository = logRepository;
    }

    @GetMapping(value = "/list")
    public ResponseEntity<PageBase<GoodsVo>> list(@RequestParam(value = "keyword", required = false) String keyword,
                                                  @RequestParam(value = "page", defaultValue = "1") Integer page,
                                                  @RequestParam(value = "size", defaultValue = "20") Integer size) {
        page = page == null || page < 0 ? 0 : page - 1;
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Goods> goods = goodsRepository.findAll(pageable);

        List<GoodsVo> goodsVos = CglibUtil.copyList(goods.getContent(), GoodsVo::new);
        PageBase<GoodsVo> pageBase = new PageBase<>(goods.getTotalPages(), goodsVos);

        return new ResponseEntity<>(pageBase, HttpStatus.OK);
    }

    @PostMapping(value = "/updateStock")
    public ResponseEntity<Boolean> updateStock(@RequestBody StockRequest request) {
        Integer value = request.getNumber();
        if ("out".equals(request.getType())) {
            value = -value;
        }

        Optional<Goods> goodsOptional = goodsRepository.findById(request.getId());
        if (!goodsOptional.isPresent()) return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);

        Goods goods = goodsOptional.get();
        goods.setNumber(goods.getNumber() + value);
        goodsRepository.saveAndFlush(goods);

        // log
        saveLog(request.getNumber(), request.getType(), goods.getId());

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping(value = "/updateFloor")
    public ResponseEntity<Boolean> updateFloor(@RequestBody FloorRequest request) {
        Optional<Goods> goodsOptional = goodsRepository.findById(request.getId());
        if (!goodsOptional.isPresent()) return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);

        Goods goods = goodsOptional.get();
        if (request.getShelvesNo() != null) {
            goods.setShelvesNo(request.getShelvesNo());
        }
        if (request.getFloor() != null) {
            goods.setFloor(request.getFloor());
        }
        goodsRepository.saveAndFlush(goods);

        // log
        saveLog(0, "update", goods.getId());

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Boolean> create(@RequestBody CreateGoodsRequest request) {
        if ("".equals(request.getName()) || "".equals(request.getUnit()) || request.getNumber() == null || request.getShelvesNo() == null || request.getFloor() == null) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        Goods goods = new Goods();
        BeanUtil.copyProperties(request, goods);

        goodsRepository.saveAndFlush(goods);

        // log
        saveLog(request.getNumber(), "in", goods.getId());

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    private void saveLog(Integer number, String operate, Long goodsId) {
        CompletableFuture.runAsync(() -> {
            Optional<Goods> goods = goodsRepository.findById(goodsId);
            if (!goods.isPresent()) {
                return;
            }

            String unit = goods.get().getUnit();

            OperationLog operationLog = new OperationLog();
            operationLog.setOperate(operate);
            operationLog.setNumber(number);
            StringBuilder text = new StringBuilder();
            text.append("管理员");
            switch (operate) {
                case "in":
                    text.append("入库").append("数量").append(number).append(unit);
                    break;
                case "out":
                    text.append("出库").append("数量").append(number).append(unit);
                    break;
                case "update":
                    text.append("更新货架层");
                    break;
                default:
                    text.append("未知操作");
            }
            operationLog.setContext(text.toString());
            logRepository.save(operationLog);
        });
    }

}
