package com.template.springjwtsecurity.websecurity.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${template.springjwtsecurity.jwtSecret}")
    private String jwtSecret;

    @Value("${template.springjwtsecurity.jwtExpiration}")
    private int jwtExpiration;

    public String generateToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + this.jwtExpiration * 1000L))
                .signWith(SignatureAlgorithm.HS512, this.jwtSecret)
                .compact();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception exception) {
            logger.error("Message: {}", exception.getMessage());
        }

        return false;
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(this.jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
