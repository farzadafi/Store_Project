package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.ProductDto;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.mapper.ProductMapper;
import com.farzadafi.online_store.model.Product;
import com.farzadafi.online_store.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public record ProductController(ProductService productService) {

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ReturnMessage> save(@ModelAttribute("productDto") @RequestBody ProductDto productDto) {
        Product product = ProductMapper.dtoToModel(productDto);
        productService.addProduct(product);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }
}
