package com.template.springjwtsecurity.util;

import java.io.Serializable;

public class Response<T> implements Serializable {
    public T body;
    public String error;

    public Response(T body, String error) {
        this.body = body;
        this.error = error;
    }
}
