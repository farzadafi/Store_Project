package com.farzadafi.online_store.jwt;

//import com.google.common.net.HttpHeaders; //ToDo
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

//@ConfigurationProperties(prefix = "application.jwt")
@NoArgsConstructor
@Getter
@Setter
@Configuration
public class JwtConfig {

    @Value("${application.jwt.secretKey}")
    private String secretKey;

    @Value("${application.jwt.tokenPrefix}")
    private String tokenPrefix;

    @Value("${application.jwt.tokenExpirationAfterDays}")
    private Integer tokenExpirationAfterDays;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }

//    public void setTokenExpirationAfterDays(Integer tokenExpirationAfterDays) {
//        this.tokenExpirationAfterDays = tokenExpirationAfterDays;
//    }
}