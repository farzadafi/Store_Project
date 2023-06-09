package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.CategoryDto;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.mapper.CategoryMapper;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.service.CategoryService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final MessageSource messageSource;


    public CategoryController(CategoryService categoryService, MessageSource messageSource) {
        this.categoryService = categoryService;
        this.messageSource = messageSource;
    }

    @PreAuthorize("hasRole('ADMIN')")
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

    @GetMapping("find-all")
    public List<CategoryDto> findAll() {
        List<Category> categoryList = categoryService.findAllCategory();
        return CategoryMapper.INSTANCE.modelsToDtos(categoryList);
    }

    @GetMapping("/test")
    public String test() {
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage("error.unauthorized.message", null, locale);
    }
}
