package com.ubt.andi.ecommerceapi.dto;
import lombok.Data;
@Data
public class AuthResponseDto {
    private String accessToken;
    private String userName;
    private String tokenType="Bearer ";
    public AuthResponseDto(String accessToken){
        this.accessToken=accessToken;
    }
}
