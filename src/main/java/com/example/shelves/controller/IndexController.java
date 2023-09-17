package com.example.shelves.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping("/")
    public String index() {
        return "forward:html/goods-list.html";
    }

    @RequestMapping("/chart")
    public String chart() {
        return "forward:html/bar-stack.html";
    }
}
