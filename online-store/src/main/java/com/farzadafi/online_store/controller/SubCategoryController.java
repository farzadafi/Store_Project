package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.dto.SubCategoryDto;
import com.farzadafi.online_store.mapper.SubCategoryMapper;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.service.SubCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sub-category")
public record SubCategoryController(SubCategoryService subCategoryService) {

    @PostMapping("/add")
    public ResponseEntity<ReturnMessage> addCategory(@RequestBody SubCategoryDto subCategoryDto,
                                                     @RequestParam String categoryId) {
        SubCategory subCategory = SubCategoryMapper.INSTANCE.dtoToModel(subCategoryDto);
        subCategoryService.addSubCategory(categoryId, subCategory);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }

    @GetMapping("find-all-by-category-id")
    public List<SubCategoryDto> findAllByCategoryId(@RequestParam String categoryId) {
        List<SubCategory> allByCategoryId = subCategoryService.findAllByCategoryId(categoryId);
        return SubCategoryMapper.INSTANCE.modelsToDtos(allByCategoryId);
    }
}
