package com.guvenx.ecommerce.config;

import com.guvenx.ecommerce.entity.Country;
import com.guvenx.ecommerce.entity.Product;
import com.guvenx.ecommerce.entity.ProductCategory;
import com.guvenx.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        System.out.println("testsdakjdlaskjd alskhfnskldfjsldkhf slşdjf halsşkdjf ");
        HttpMethod[] theUnSupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable http methods for Product; put, post ,delete
        disableHttpMethods(Product.class,config, theUnSupportedActions);

        // disable http methods for ProductCategory; put, post ,delete
        disableHttpMethods(ProductCategory.class,config, theUnSupportedActions);

        // disable http methods for Country; put, post ,delete
        disableHttpMethods(Country.class,config, theUnSupportedActions);

        // disable http methods for State; put, post ,delete
        disableHttpMethods(State.class,config, theUnSupportedActions);

        // call an internal helper method
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnSupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // - expose entity ids -
        // this part is really confusing, so im gonna print lots of things to figure out what is going on.
        // Ok, we just passing domains/entities to exposeIdsFor method to expose ids
        // exposeIdsFor => Set the list of domain types for which we will expose the ID value as a normal property.

        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = this.entityManager.getMetamodel().getEntities();
        System.out.println("entityManager.getMetamodel() ==>>\n" + this.entityManager.getMetamodel().toString());
        System.out.println("Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities() ==>>\n" + entities);

        // create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // get the entity types for the entities
        System.out.println("entityType => entities");
        for (EntityType entityType : entities) {
            entityClasses.add(entityType.getJavaType());
            System.out.println("entityType.getJavaType() ==>>\n" + entityType.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        System.out.println("entityClasses.toArray(new Class[0]) ==>> \n" + Arrays.deepToString(domainTypes));
        config.exposeIdsFor(domainTypes);
    }
}
