package com.ubt.andi.ecommerceapi.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration {
    private final UserDetailsService userDetailsService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final JwtAuthFilter jwtAuthFilter;
    public WebSecurityConfiguration(UserDetailsService userDetailsService,JwtAuthEntryPoint jwtAuthEntryPoint,JwtAuthFilter jwtAuthFilter){
        this.userDetailsService=userDetailsService;
        this.jwtAuthEntryPoint=jwtAuthEntryPoint;
        this.jwtAuthFilter=jwtAuthFilter;

    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/register")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/test")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/states/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/checkout/purchase")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/productCategories/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/products")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/products/search/findByProductCategoryId/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/countries/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/orders/**")).authenticated()
                .anyRequest().authenticated().and()
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
//        http.csrf().dissable()
//                .authorizeRequests()
//                .requestMatchers(new AntPathRequestMatcher("/register")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/test")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/products")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/products/search/findByProductCategoryId/**")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/orders/**")).authenticated()
//                .requestMatchers(new AntPathRequestMatcher("/products/**")).permitAll()
//                .requestMatchers(new AntPathRequestMatcher("/countries/**")).permitAll()
//                .and().exceptionHandling().authenticationEntryPoint(this.jwtAuthEntryPoint)
//                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and().addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


    }
    @Bean
    protected static PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }
    public void configureAuthenticationManager(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
