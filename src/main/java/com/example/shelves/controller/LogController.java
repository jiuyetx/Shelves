package com.example.shelves.controller;

import cn.hutool.extra.cglib.CglibUtil;
import com.example.shelves.dao.OperationLogRepository;
import com.example.shelves.entity.OperationLog;
import com.example.shelves.entity.PageBase;
import com.example.shelves.vo.OperateLogVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/log")
public class LogController {
    private final OperationLogRepository logRepository;

    public LogController(OperationLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @GetMapping("list")
    public ResponseEntity<PageBase<OperateLogVo>> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                                  @RequestParam(value = "size", defaultValue = "20") Integer size) {
        page = page == null || page < 0 ? 0 : page - 1;
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<OperationLog> goods = logRepository.findAll(pageable);

        List<OperateLogVo> operateLogVos = CglibUtil.copyList(goods.getContent(), OperateLogVo::new);
        PageBase<OperateLogVo> pageBase = new PageBase<>(goods.getTotalPages(), operateLogVos);

        return ResponseEntity.ok(pageBase);
    }
}
