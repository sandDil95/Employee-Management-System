package com.ems.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig { //http://localhost:8080/swagger-ui/index.html
    @Bean
    public OpenAPI employeeManagementOpenAPI() {
        Info info = new Info().title("Employee Management")
                .description("Production-grade REST API for managing employees")
                .version("v1")
                .contact( new Contact().name("Test1234").email("test1234@gmail.com"));
        Components components = new Components().addSecuritySchemes("BearerAuth",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"));
        return new OpenAPI().info(info)
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .components(components)
                .externalDocs(new ExternalDocumentation().description("Employee Management API Documentation"));
    }
}
