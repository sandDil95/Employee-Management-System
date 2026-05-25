package com.ems.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Service responsible for generating, validating, and extracting information from JWT tokens.
 *
 * This class handles: JWT token generation, Username extraction from token,
 * Token validation, Token expiration checking
 *
 * JWT secret and expiration are loaded from application properties/environment variables.
 */
@Service
@Schema(description = "JWT service for token generation and validation")
public class JwtService {

    /**
     * Secret key used to sign and verify JWT tokens.
     */
    private final SecretKey secretKey;
    /**
     * JWT expiration time in milliseconds.
     */
    private final long expiration;

    /**
     * Constructs JwtService with secret key and expiration configuration.
     *
     * @param secret JWT secret loaded from configuration
     * @param expiration JWT expiration time in milliseconds
     */
    public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") String expiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.expiration = Long.parseLong(expiration);
    }

    /**
     * Generates JWT token for authenticated user.
     *
     * @param userDetails authenticated user details
     * @return generated JWT token
     */
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder().subject(userDetails.getUsername())
                .issuedAt(new Date())
                .signWith(secretKey)
                .expiration(new Date((System.currentTimeMillis() + expiration)))
                .compact();
    }

    /**
     * Extracts username from JWT token.
     *
     * @param token JWT token
     * @return username stored in token subject
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Extracts all claims from JWT token.
     *
     * @param token JWT token
     * @return extracted claims payload
     */
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Validates JWT token against authenticated user.
     *
     * Validation checks: Token username matches authenticated user and Token is not expired
     *
     * @param token JWT token
     * @param userDetails authenticated user details
     * @return true if token is valid
     */
    private boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Checks whether JWT token is expired.
     *
     * @param token JWT token
     * @return true if token expiration date is before current date
     */
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
