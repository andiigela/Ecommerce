package com.ubt.andi.ecommerceapi.config;
import com.ubt.andi.ecommerceapi.models.Product;
import com.ubt.andi.ecommerceapi.models.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,CorsRegistry corsRegistry) {
        HttpMethod[] theUnSupportedActions = {HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions)))
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                );
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions)))
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                );
    }

}
