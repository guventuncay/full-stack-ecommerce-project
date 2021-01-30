package com.guvenx.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
//@Data
/*
 * Do NOT use @Data annotation in this class. Because, this method overrides the toString method. In this case this is not good for us.
 * The toString method of ProductCategory which written by @Data, prints Product class. And toString method of Product class, prints ProductCategory class.
 * And that means -- StackOverFlowError
 * Product ==print>> ProductCategory
 * ProductCategory ==print>> Product
 * Product ==print>> ProductCategory
 * ...
 * Just use @Getter and @Setter
 * */
@Getter
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;

}

