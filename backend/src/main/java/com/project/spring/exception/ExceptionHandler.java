package com.project.spring.exception;

public @interface ExceptionHandler {

    Class<UserNotFoundException> value();

}
