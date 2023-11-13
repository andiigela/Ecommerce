package com.ubt.andi.ecommerceapi;

import com.ubt.andi.ecommerceapi.models.ProductCategory;
import com.ubt.andi.ecommerceapi.repositories.ProductCategoryRepository;
import com.ubt.andi.ecommerceapi.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
public class ProductCategoriesController {
    private final ProductCategoryRepository productCategoryRepository;
    public ProductCategoriesController(ProductCategoryRepository productCategoryRepository){
        this.productCategoryRepository=productCategoryRepository;
    }
    @Transactional
    @GetMapping("/productCategories")
    public List<ProductCategory> getProductCategories(){
        return productCategoryRepository.findAll();
    }
}
