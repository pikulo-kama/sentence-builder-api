package com.drabazha.sentence.builder.api.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import static java.util.Objects.isNull;

public class BasicCache<O, PK> implements Cache<O, PK> {

    private static BasicCache<?, ?> instance;
    protected Map<PK, O> cache;

    BasicCache() {
        this.cache = new HashMap<>();
    }

    public static <I, K> BasicCache<I, K> getInstance() {
        if (isNull(instance)) {
            instance = new BasicCache<>();
        }
        return (BasicCache<I, K>) instance;
    }

    @Override
    public void reloadCache() {
        cache = new HashMap<>();
    }

    @Override
    public Optional<O> getCachedObject(PK id) {
        return Optional.ofNullable(cache.get(id));
    }

    @Override
    public O getCachedObject(PK id, Function<PK, O> callback) {
        return cache.putIfAbsent(id, callback.apply(id));
    }
}
