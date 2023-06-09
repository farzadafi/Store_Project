package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.ProductDto;
import com.farzadafi.online_store.dto.ProductDtoResponse;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.dto.UpdateProductDto;
import com.farzadafi.online_store.mapper.ProductMapper;
import com.farzadafi.online_store.model.Product;
import com.farzadafi.online_store.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(methods = RequestMethod.POST, allowCredentials = "true", allowedHeaders = "*", originPatterns = "*", origins = "allowedOriginPatterns")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ReturnMessage> save(@ModelAttribute("productDto") @RequestBody ProductDto productDto) {
        Product product = ProductMapper.dtoToModel(productDto);
        productService.addProduct(product);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }

    @GetMapping("find-all-by-subcategory-id")
    public List<ProductDtoResponse> findAllBySubCategoryId(@RequestParam String subCategoryId) {
        List<Product> allBySubCategoryId = productService.findAllBySubCategoryId(subCategoryId);
        assert allBySubCategoryId != null;
        return ProductMapper.modelsToDtos(allBySubCategoryId);
    }

    @GetMapping("find-all-product")
    public List<ProductDtoResponse> findAllProduct() {
        List<Product> allBySubCategoryId = productService.findAllProduct();
        assert allBySubCategoryId != null;
        return ProductMapper.modelsToDtos(allBySubCategoryId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("delete")
    public void deleteProduct(@RequestParam String id) {
        productService.removeProduct(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void update(@RequestBody ArrayList<UpdateProductDto> updateProductDtos) {
        productService.update(updateProductDtos);
    }
}
