package com.ubt.andi.ecommerceapi.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtGenerator {
    private Key jwtKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expiryDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);
        String token = Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(new Date())
                        .setExpiration(expiryDate)
                        .signWith(jwtKey,SignatureAlgorithm.HS512)
                        .compact();
        return token;
    }
    public String getUsernameFromJWT(String token){
        Claims claims = Jwts.parser()
                        .setSigningKey(jwtKey)
                        .parseClaimsJws(token)
                        .getBody();
        return claims.getSubject();
    }
    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtKey).parseClaimsJws(token);
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
