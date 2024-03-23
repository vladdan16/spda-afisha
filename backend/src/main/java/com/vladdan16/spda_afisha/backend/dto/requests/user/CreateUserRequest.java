package com.vladdan16.spda_afisha.backend.dto.requests.user;

public record CreateUserRequest(
    String name,
    String surname
    // TODO: Вынести роли в отдельную ручку
    //  Не надо указывать роль при регистрации, надо чтобы только админ мог назначать роль
    // UserRole role
) {}
