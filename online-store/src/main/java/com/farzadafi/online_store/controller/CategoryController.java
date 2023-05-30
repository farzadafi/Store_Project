package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.CategoryDto;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.mapper.CategoryMapper;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/category")
public record CategoryController(CategoryService categoryService) {

    @PostMapping("/add")
    public ResponseEntity<ReturnMessage> addCategory(@RequestBody CategoryDto categoryDto) {
        Category category = CategoryMapper.INSTANCE.dtoToModel(categoryDto);
        categoryService.addCategory(category);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }

    @GetMapping("find-by-id")
    public CategoryDto findById(@RequestParam UUID id) {
        Category category = categoryService.findById(id.toString());
        return CategoryMapper.INSTANCE.modelToDto(category);
    }
}
